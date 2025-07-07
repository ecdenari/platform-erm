using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixSiteManagementStoredProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop existing stored procedure
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[usp_GetSiteManagementPropertiesList]");

            // Create corrected stored procedure - Properties table already has all needed fields
            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[usp_GetSiteManagementPropertiesList]
                AS
                BEGIN
                    SET NOCOUNT ON;
                    
                    SELECT DISTINCT
                        p.PropertyID,
                        p.PropertyName,
                        p.PropertyAddressLine1,
                        p.PropertyAddressLine2,
                        p.PropertyAddressCity,
                        p.PropertyAddressStateProvinceCode,
                        p.PropertyAddressZipCode,
                        p.PropertyStatusName,
                        p.BranchName,
                        p.AccountOwnerContactName,
                        p.ProductionManagerContactName,
                        p.IsActive
                    FROM Properties p
                    WHERE 
                        p.IsActive = 1
                        AND (
                            -- Include properties with Active or Maintenance status
                            p.PropertyStatusName IN ('Active', 'Maintenance')
                            OR 
                            -- Include customer properties (those with account owners)
                            p.AccountOwnerContactName IS NOT NULL
                            OR
                            -- Include properties with production managers (indicates active management)
                            p.ProductionManagerContactName IS NOT NULL
                        )
                        -- Exclude test or demo properties
                        AND (p.PropertyName NOT LIKE '%test%' OR p.PropertyName IS NULL)
                        AND (p.PropertyName NOT LIKE '%demo%' OR p.PropertyName IS NULL)
                    ORDER BY p.PropertyName ASC;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the fixed stored procedure
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[usp_GetSiteManagementPropertiesList]");
        }
    }
}
