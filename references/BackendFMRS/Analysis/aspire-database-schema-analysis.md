# Aspire Database Schema Analysis

## Overview
This document provides a comprehensive analysis of how the backend codebase manages database schema and SQL tables for Aspire integrations, based on examination of the existing `dbo.Properties` table and related infrastructure.

## Database Schema Management Approach

### 1. **Entity Framework Core with Code-First Approach**

The project uses **Entity Framework Core with Code-First** approach for database schema management:

#### Key Components:
- **DbContext**: `PureGreenLandGroup.Infrastructure/DbConn/AppDbContext.cs`
- **Migrations**: `PureGreenLandGroup.Infrastructure/Migrations/`
- **Entities**: `PureGreenLandGroup.Domain/Entities/`

#### How Tables Are Created:

1. **Entity Definition**: Tables are defined as C# classes with data annotations
2. **DbContext Registration**: Entities are registered as `DbSet<T>` properties
3. **Migration Generation**: EF Core generates migrations using `Add-Migration` command
4. **Database Update**: Migrations are applied using `Update-Database` command

### 2. **Properties Table Creation Pattern**

The `dbo.Properties` table was created in the initial migration (`20240725104752_initial.cs`):

```csharp
migrationBuilder.CreateTable(
    name: "Properties",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        PropertyID = table.Column<int>(type: "int", nullable: false),
        IsActive = table.Column<bool>(type: "bit", nullable: false),
        PropertyStatusID = table.Column<int>(type: "int", nullable: true),
        PropertyStatusName = table.Column<string>(type: "nvarchar(max)", nullable: true),
        BranchID = table.Column<int>(type: "int", nullable: true),
        BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
        BranchCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
        // ... many more fields
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Properties", x => x.Id);
    });
```

### 3. **DbContext Configuration**

The `AppDbContext` registers the Properties table:

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Properties> Properties { get; set; }
    public DbSet<PropertiesContact> PropertiesContact { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Fluent API configuration for relationships
        modelBuilder.Entity<PropertiesContact>()
            .HasOne(pc => pc.Properties)
            .WithMany()
            .HasForeignKey(pc => pc.PropertyId)
            .HasPrincipalKey(p => p.PropertyID);
    }
}
```

### 4. **Entity Definition Pattern**

Entities follow this pattern:

```csharp
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities
{
    public class Properties
    {
        [Key]
        public int Id { get; set; }
        public int PropertyID { get; set; }
        public bool IsActive { get; set; }
        // ... other properties with nullable reference types
        public string? PropertyStatusName { get; set; } = default!;
    }
}
```

## Database Access Patterns

### 1. **Entity Framework Core (Primary Pattern)**

Most database operations use EF Core with:
- **Unit of Work Pattern**: `IUnitOfWork` and `UnitOfWork` classes
- **Generic Repository**: `IRepository<T>` and `Repository<T>` classes
- **DbContext**: Direct access through `AppDbContext`

### 2. **Raw SQL with ADO.NET (Secondary Pattern)**

Some operations use raw SQL with ADO.NET:
- **Stored Procedures**: Used for complex queries and reporting
- **SqlConnection**: Direct database connections
- **SqlCommand**: Parameterized queries
- **SqlBulkCopy**: Bulk insert operations (used in AspireService)

Example from AspireService:
```csharp
using (SqlConnection sqlConnection = new(dbConnection))
{
    using (SqlBulkCopy sqlBulkCopy = new(sqlConnection))
    {
        sqlBulkCopy.DestinationTableName = "[dbo].[MstUsers]";
        // Column mappings...
        await sqlBulkCopy.WriteToServerAsync(usersFileDataTable);
    }
}
```

### 3. **No Dapper Usage**

The codebase does **NOT** use Dapper. All data access is either:
- Entity Framework Core (primary)
- Raw ADO.NET (secondary)

## Migration Management

### 1. **Migration Structure**

Migrations are stored in: `PureGreenLandGroup.Infrastructure/Migrations/`

Key migrations:
- `20240725104752_initial.cs` - Initial schema with Properties table
- `20250212143702_EquipmentSchedulerDb.cs` - Equipment-related tables
- `20250307110752_NewInspectionTables.cs` - Inspection-related tables

### 2. **Migration Pattern**

Each migration follows this pattern:
```csharp
public partial class MigrationName : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "TableName",
            columns: table => new { /* column definitions */ },
            constraints: table => { /* constraints */ });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "TableName");
    }
}
```

## Data Seeding

### 1. **Seed Data Service**

Master data is seeded using: `PureGreenLandGroup.Infrastructure/SeedData/SeedDataService.cs`

```csharp
public static void SeedMasterData(ModelBuilder builder)
{
    builder.Entity<MstManufacturer>().HasData(
        new MstManufacturer { Id = 1, ManufacturerName = "Hunter", IsActive = true },
        new MstManufacturer { Id = 2, ManufacturerName = "RainBird", IsActive = true }
    );
    // ... more seed data
}
```

### 2. **Seed Data Registration**

Seed data is registered in `AppDbContext.OnModelCreating()`:
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    SeedDataService.SeedMasterData(modelBuilder);
}
```

## Recommendations for New Aspire Tables

### 1. **Entity Framework Migration Approach (Recommended)**

For new tables like `Branches`, `PropertyStatuses`, and `PropertyTypes`:

1. **Create Entity Classes**:
   ```csharp
   public class Branch
   {
       [Key]
       public int Id { get; set; }
       public int BranchID { get; set; }
       public string? BranchName { get; set; } = default!;
       // ... other properties
   }
   ```

2. **Register in DbContext**:
   ```csharp
   public DbSet<Branch> Branches { get; set; }
   public DbSet<PropertyStatus> PropertyStatuses { get; set; }
   public DbSet<PropertyType> PropertyTypes { get; set; }
   ```

3. **Generate Migration**:
   ```bash
   Add-Migration AddAspireTables
   ```

4. **Apply Migration**:
   ```bash
   Update-Database
   ```

### 2. **Raw SQL Scripts Approach (Alternative)**

If manual SQL scripts are preferred:

1. **Create SQL Scripts** in `SQL/` directory
2. **Execute manually** against the database
3. **Ensure entity classes match** the SQL schema

### 3. **Hybrid Approach (Current Implementation)**

The current implementation uses:
- **Entity Framework** for schema management and data access
- **Raw SQL scripts** for documentation and manual execution
- **AutoMapper** for DTO to Entity mapping

## Key Findings

1. **Primary Pattern**: Entity Framework Core with Code-First migrations
2. **Secondary Pattern**: Raw ADO.NET for bulk operations and stored procedures
3. **No Dapper**: The codebase doesn't use Dapper
4. **Consistent Naming**: All tables follow `dbo.TableName` convention
5. **Nullable Reference Types**: Used extensively with `= default!` pattern
6. **Data Annotations**: `[Key]` attribute for primary keys
7. **Fluent API**: Used for complex relationships in `OnModelCreating()`

## Conclusion

The existing `dbo.Properties` table was created using Entity Framework Core migrations. For new Aspire tables, the recommended approach is to:

1. Create entity classes following the existing pattern
2. Register them in `AppDbContext`
3. Generate and apply EF Core migrations
4. Use the existing Unit of Work and Repository patterns for data access

This approach maintains consistency with the existing codebase architecture and provides proper version control for database schema changes. 