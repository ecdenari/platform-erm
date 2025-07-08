using Azure;
using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.Entities.InspectionEntities;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Domain.Entities.SchedulerEntities;
using PureGreenLandGroup.Infrastructure.SeedData;
using System.Runtime.ConstrainedExecution;
using System.Threading;

namespace PureGreenLandGroup.Infrastructure.DbConn
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        #region DB ENTITIES
        /*---------------------------------Master entities---------------------------------------*/
        public DbSet<MstFlowRate> MstFlowRate { get; set; }
        public DbSet<MstManufacturer> MstManufacturer { get; set; }
        public DbSet<MstModels> MstModels { get; set; }
        public DbSet<MstPlantType> MstPlantType { get; set; }
        public DbSet<MstSeasonalAdjustDropdown> MstSeasonalAdjustDropdown { get; set; }
        public DbSet<MstSlope> MstSlope { get; set; }
        public DbSet<MstSoilType> MstSoilType { get; set; }
        public DbSet<MstSprinklerType> MstSprinklerType { get; set; }
        public DbSet<MstValveSize> MstValveSize { get; set; }
        public DbSet<MstWaterSource> MstWaterSource { get; set; }
        public DbSet<MstBrokenLateralDropdown> MstBrokenLateralDropdown { get; set; }
        public DbSet<MstZoneAreaDropDown> MstZoneAreaDropDown { get; set; }
        public DbSet<MstZoneIssuesDropDown> MstZoneIssuesDropDown { get; set; }
        public DbSet<ProgramRunTime> ProgramRunTime { get; set; }
        public DbSet<ProgramStartTime> ProgramStartTime { get; set; }
        public DbSet<MonthsOfYear> MonthsOfYear { get; set; }

        /*--------------------------------- entities---------------------------------------*/
        public DbSet<ControllerProgrames> ControllerProgrames { get; set; }
        public DbSet<Controllers> Controllers { get; set; }
        public DbSet<ControllerZones> ControllerZones { get; set; }
        
        public DbSet<Properties> Properties { get; set; }
        public DbSet<PropertiesContact> PropertiesContact { get; set; }
        
        /*---------------------------------Aspire entities---------------------------------------*/
        // public DbSet<Branch> Branches { get; set; }
        // public DbSet<PropertyStatus> PropertyStatuses { get; set; }
        // public DbSet<PropertyType> PropertyTypes { get; set; }
        
        public DbSet<SeasionalAdjust> SeasionalAdjust { get; set; }
        public DbSet<MstUsersDetails> MstUsersDetails { get; set; }
        public DbSet<MstRoles> MstRoles { get; set; }
        public DbSet<RuntimeReportLog> RuntimeReportLog { get; set; }
        
        /*---------Company entities----------------*/
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanySettings> CompanySettings { get; set; }

        /*---------Site Management entities----------------*/
        public DbSet<SiteReportTemplate> SiteReportTemplates { get; set; }
        public DbSet<SiteReport> SiteReports { get; set; }
        public DbSet<SiteReportSection> SiteReportSections { get; set; }
        public DbSet<SiteReportPhoto> SiteReportPhotos { get; set; }
        public DbSet<SiteReportIssue> SiteReportIssues { get; set; }

        /*---------Inspection entities----------------*/
        public DbSet<Inspection> Inspection { get; set; }
        public DbSet<ZoneIssuesInspection> ZoneIssuesInspection { get; set; }
        public DbSet<DraftIrrigationSettings> DraftIrrigationSettings { get; set; }
        public DbSet<InspectedZoneBrokenLateral> InspectedZoneBrokenLateral { get; set; }
        public DbSet<InspectedZoneBrokenMain> InspectedZoneBrokenMain { get; set; }
        public DbSet<InspectedZoneImages> InspectedZoneImages { get; set; }
        public DbSet<InspectedMoveHead> InspectedMoveHead { get; set; }
        public DbSet<InspectedValveFail> InspectedValveFail { get; set; }
        public DbSet<CatalogMappingLabel> CatalogMappingLabel { get; set; }
        public DbSet<MstLinearRepair> MstLinearRepair { get; set; }

        /*---------scheduler entities----------------*/
        public DbSet<EquipmentAssetIds> EquipmentAssetIds { get; set; }
        public DbSet<EquipmentSynLog> EquipmentSynLog { get; set; }
        public DbSet<SchedulerExceptions> SchedulerExceptions { get; set; }

        #endregion DB ENTITIES

        #region DB CONFIGURATION
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PropertiesContact>()
           .HasOne(pc => pc.Properties)
           .WithMany() // Assuming one Property can have many Contacts
           .HasForeignKey(pc => pc.PropertyId)
           .HasPrincipalKey(p => p.PropertyID); // Specify that PropertyId references PropertyID

            // Company and CompanySettings relationship
            modelBuilder.Entity<CompanySettings>()
                .HasOne(cs => cs.Company)
                .WithOne(c => c.Settings)
                .HasForeignKey<CompanySettings>(cs => cs.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            // Company index for performance
            modelBuilder.Entity<Company>()
                .HasIndex(c => c.Name)
                .IsUnique();

            // Site Management entity relationships
            
            // SiteReport to Property relationship (Aspire Property ID)
            modelBuilder.Entity<SiteReport>()
                .HasOne(sr => sr.Property)
                .WithMany()
                .HasForeignKey(sr => sr.PropertyID)
                .HasPrincipalKey(p => p.PropertyID)
                .OnDelete(DeleteBehavior.Restrict);

            // SiteReport to Template relationship (optional)
            modelBuilder.Entity<SiteReport>()
                .HasOne(sr => sr.Template)
                .WithMany(t => t.SiteReports)
                .HasForeignKey(sr => sr.TemplateId)
                .OnDelete(DeleteBehavior.SetNull);

            // SiteReportSection to SiteReport relationship
            modelBuilder.Entity<SiteReportSection>()
                .HasOne(srs => srs.Report)
                .WithMany(sr => sr.Sections)
                .HasForeignKey(srs => srs.ReportId)
                .OnDelete(DeleteBehavior.Cascade);

            // SiteReportPhoto to SiteReport relationship
            modelBuilder.Entity<SiteReportPhoto>()
                .HasOne(srp => srp.Report)
                .WithMany(sr => sr.Photos)
                .HasForeignKey(srp => srp.ReportId)
                .OnDelete(DeleteBehavior.Cascade);

            // SiteReportPhoto to SiteReportSection relationship (optional)
            modelBuilder.Entity<SiteReportPhoto>()
                .HasOne(srp => srp.Section)
                .WithMany(srs => srs.Photos)
                .HasForeignKey(srp => srp.SectionId)
                .OnDelete(DeleteBehavior.SetNull);

            // SiteReportIssue to SiteReport relationship
            modelBuilder.Entity<SiteReportIssue>()
                .HasOne(sri => sri.Report)
                .WithMany(sr => sr.Issues)
                .HasForeignKey(sri => sri.ReportId)
                .OnDelete(DeleteBehavior.Cascade);

            // SiteReportIssue to SiteReportSection relationship (optional)
            modelBuilder.Entity<SiteReportIssue>()
                .HasOne(sri => sri.Section)
                .WithMany()
                .HasForeignKey(sri => sri.SectionId)
                .OnDelete(DeleteBehavior.SetNull);

            // Indexes for performance
            modelBuilder.Entity<SiteReport>()
                .HasIndex(sr => sr.PropertyID);
            
            modelBuilder.Entity<SiteReport>()
                .HasIndex(sr => sr.Status);
            
            modelBuilder.Entity<SiteReport>()
                .HasIndex(sr => sr.ReportDate);

            modelBuilder.Entity<SiteReportPhoto>()
                .HasIndex(srp => srp.ReportId);

            modelBuilder.Entity<SiteReportIssue>()
                .HasIndex(sri => sri.Status);

            //inject seed data into database
            SeedDataService.SeedMasterData(modelBuilder);
        }
        #endregion DB CONFIGURATION
    }
}
