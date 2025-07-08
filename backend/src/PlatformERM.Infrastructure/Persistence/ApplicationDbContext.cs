using Microsoft.EntityFrameworkCore;
using PlatformERM.Infrastructure.Common.Interfaces;
using PlatformERM.Domain.Common;
using PlatformERM.Domain.Entities;

namespace PlatformERM.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    private readonly ITenantContextService _tenantService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ITenantContextService tenantService) : base(options)
    {
        _tenantService = tenantService;
    }

    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<PropertyContact> PropertyContacts { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<WorkOrder> WorkOrders { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Tenant entity (not tenant-scoped)
        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Id).ValueGeneratedNever();
            entity.HasIndex(t => t.Subdomain).IsUnique();
            entity.HasIndex(t => t.ApiKey).IsUnique();
            entity.Property(t => t.Settings).HasColumnType("jsonb");
        });

        // Apply global query filter for tenant isolation
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ITenantEntity).IsAssignableFrom(entityType.ClrType))
            {
                var method = typeof(ApplicationDbContext)
                    .GetMethod(nameof(SetGlobalQueryFilter), System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)!
                    .MakeGenericMethod(entityType.ClrType);
                method.Invoke(this, new object[] { modelBuilder });
            }
        }

        // Configure entity relationships
        ConfigureEntityRelationships(modelBuilder);
    }

    private void SetGlobalQueryFilter<T>(ModelBuilder modelBuilder) where T : class, ITenantEntity
    {
        modelBuilder.Entity<T>().HasQueryFilter(e => e.TenantId == _tenantService.CurrentTenant);
    }

    private void ConfigureEntityRelationships(ModelBuilder modelBuilder)
    {
        // Configure Address value object
        modelBuilder.Entity<Property>().OwnsOne(p => p.Address, address =>
        {
            address.Property(a => a.Street).HasColumnName("Street");
            address.Property(a => a.Suite).HasColumnName("Suite");
            address.Property(a => a.City).HasColumnName("City");
            address.Property(a => a.State).HasColumnName("State");
            address.Property(a => a.ZipCode).HasColumnName("ZipCode");
            address.Property(a => a.Country).HasColumnName("Country");
            address.Property(a => a.Latitude).HasColumnName("Latitude");
            address.Property(a => a.Longitude).HasColumnName("Longitude");
        });

        // Company -> Properties
        modelBuilder.Entity<Property>()
            .HasOne(p => p.Company)
            .WithMany(c => c.Properties)
            .HasForeignKey(p => p.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        // PropertyContact junction table
        modelBuilder.Entity<PropertyContact>()
            .HasKey(pc => pc.Id);

        modelBuilder.Entity<PropertyContact>()
            .HasOne(pc => pc.Property)
            .WithMany(p => p.PropertyContacts)
            .HasForeignKey(pc => pc.PropertyId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PropertyContact>()
            .HasOne(pc => pc.Contact)
            .WithMany()
            .HasForeignKey(pc => pc.ContactId)
            .OnDelete(DeleteBehavior.Cascade);

        // Ensure unique property-contact-role combinations
        modelBuilder.Entity<PropertyContact>()
            .HasIndex(pc => new { pc.PropertyId, pc.ContactId, pc.Role })
            .IsUnique();

        // Company -> Contacts
        modelBuilder.Entity<Contact>()
            .HasOne(c => c.Company)
            .WithMany(co => co.Contacts)
            .HasForeignKey(c => c.CompanyId)
            .OnDelete(DeleteBehavior.SetNull);

        // Property -> WorkOrders
        modelBuilder.Entity<WorkOrder>()
            .HasOne(wo => wo.Property)
            .WithMany(p => p.WorkOrders)
            .HasForeignKey(wo => wo.PropertyId)
            .OnDelete(DeleteBehavior.Cascade);

        // Contact -> WorkOrders (assigned to)
        modelBuilder.Entity<WorkOrder>()
            .HasOne(wo => wo.AssignedToContact)
            .WithMany()
            .HasForeignKey(wo => wo.AssignedToContactId)
            .OnDelete(DeleteBehavior.SetNull);

        // Configure enums
        modelBuilder.Entity<Property>()
            .Property(p => p.PropertyType)
            .HasConversion<string>();

        modelBuilder.Entity<Property>()
            .Property(p => p.Status)
            .HasConversion<string>();

        modelBuilder.Entity<PropertyContact>()
            .Property(pc => pc.Role)
            .HasConversion<string>();

        // Indexes for performance
        modelBuilder.Entity<Company>().HasIndex(c => c.TenantId);
        modelBuilder.Entity<Property>().HasIndex(p => p.TenantId);
        modelBuilder.Entity<Property>().HasIndex(p => p.CompanyId);
        modelBuilder.Entity<PropertyContact>().HasIndex(pc => pc.TenantId);
        modelBuilder.Entity<PropertyContact>().HasIndex(pc => pc.PropertyId);
        modelBuilder.Entity<PropertyContact>().HasIndex(pc => pc.ContactId);
        modelBuilder.Entity<Contact>().HasIndex(c => c.TenantId);
        modelBuilder.Entity<WorkOrder>().HasIndex(wo => wo.TenantId);
        modelBuilder.Entity<User>().HasIndex(u => u.TenantId);
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

        // Note: Composite index on Address coordinates will be added later via raw SQL if needed
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<ITenantEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.TenantId = _tenantService.CurrentTenant;
            }
        }

        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}