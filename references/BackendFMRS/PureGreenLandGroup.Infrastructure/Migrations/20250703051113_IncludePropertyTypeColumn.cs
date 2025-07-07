using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IncludePropertyTypeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DROP PROCEDURE IF EXISTS [dbo].[usp_GetSiteManagementPropertiesList];
            ");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[usp_GetSiteManagementPropertiesList]
                AS
                BEGIN
                    SET NOCOUNT ON;
                    
                    SELECT 
                        p.PropertyID,
                        p.PropertyName,
                        -- Improved address concatenation that handles NULL values properly
                        CASE 
                            WHEN p.PropertyAddressLine1 IS NOT NULL THEN
                                LTRIM(RTRIM(
                                    ISNULL(p.PropertyAddressLine1, '') +
                                    CASE WHEN p.PropertyAddressLine2 IS NOT NULL THEN ', ' + p.PropertyAddressLine2 ELSE '' END +
                                    CASE WHEN p.PropertyAddressCity IS NOT NULL THEN ', ' + p.PropertyAddressCity ELSE '' END +
                                    CASE WHEN p.PropertyAddressStateProvinceCode IS NOT NULL THEN ' ' + p.PropertyAddressStateProvinceCode ELSE '' END +
                                    CASE WHEN p.PropertyAddressZipCode IS NOT NULL THEN ' ' + p.PropertyAddressZipCode ELSE '' END
                                ))
                            WHEN p.PropertyAddressCity IS NOT NULL THEN
                                LTRIM(RTRIM(
                                    ISNULL(p.PropertyAddressCity, '') +
                                    CASE WHEN p.PropertyAddressStateProvinceCode IS NOT NULL THEN ' ' + p.PropertyAddressStateProvinceCode ELSE '' END +
                                    CASE WHEN p.PropertyAddressZipCode IS NOT NULL THEN ' ' + p.PropertyAddressZipCode ELSE '' END
                                ))
                            ELSE 'Address not available'
                        END AS Address,
                        p.PropertyAddressLine1,
                        p.PropertyAddressLine2,
                        p.PropertyAddressCity,
                        p.PropertyAddressStateProvinceCode,
                        p.PropertyAddressZipCode,
                        p.PropertyStatusName,
                        p.PropertyType,
                        p.BranchName,
                        p.AccountOwnerContactName,
                        p.ProductionManagerContactName,
                        p.IsActive,
                        p.Id
                    FROM Properties p
                    WHERE 
                        -- Only include Customer properties
                        p.PropertyStatusName = 'Customer'
                        -- Only include Construction or Maintenance property types
                        AND p.PropertyType IN ('Construction', 'Maintenance')
                        -- Exclude test or demo properties
                        AND (p.PropertyName NOT LIKE '%test%' OR p.PropertyName IS NULL)
                        AND (p.PropertyName NOT LIKE '%demo%' OR p.PropertyName IS NULL)
                        -- Ensure we have a property name
                        AND p.PropertyName IS NOT NULL
                    ORDER BY p.PropertyName ASC;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DROP PROCEDURE IF EXISTS [dbo].[usp_GetSiteManagementPropertiesList];
            ");

            // Restore previous version without PropertyType column
            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[usp_GetSiteManagementPropertiesList]
                AS
                BEGIN
                    SET NOCOUNT ON;
                    
                    SELECT 
                        p.PropertyID,
                        p.PropertyName,
                        -- Improved address concatenation that handles NULL values properly
                        CASE 
                            WHEN p.PropertyAddressLine1 IS NOT NULL THEN
                                LTRIM(RTRIM(
                                    ISNULL(p.PropertyAddressLine1, '') +
                                    CASE WHEN p.PropertyAddressLine2 IS NOT NULL THEN ', ' + p.PropertyAddressLine2 ELSE '' END +
                                    CASE WHEN p.PropertyAddressCity IS NOT NULL THEN ', ' + p.PropertyAddressCity ELSE '' END +
                                    CASE WHEN p.PropertyAddressStateProvinceCode IS NOT NULL THEN ' ' + p.PropertyAddressStateProvinceCode ELSE '' END +
                                    CASE WHEN p.PropertyAddressZipCode IS NOT NULL THEN ' ' + p.PropertyAddressZipCode ELSE '' END
                                ))
                            WHEN p.PropertyAddressCity IS NOT NULL THEN
                                LTRIM(RTRIM(
                                    ISNULL(p.PropertyAddressCity, '') +
                                    CASE WHEN p.PropertyAddressStateProvinceCode IS NOT NULL THEN ' ' + p.PropertyAddressStateProvinceCode ELSE '' END +
                                    CASE WHEN p.PropertyAddressZipCode IS NOT NULL THEN ' ' + p.PropertyAddressZipCode ELSE '' END
                                ))
                            ELSE 'Address not available'
                        END AS Address,
                        p.PropertyAddressLine1,
                        p.PropertyAddressLine2,
                        p.PropertyAddressCity,
                        p.PropertyAddressStateProvinceCode,
                        p.PropertyAddressZipCode,
                        p.PropertyStatusName,
                        p.BranchName,
                        p.AccountOwnerContactName,
                        p.ProductionManagerContactName,
                        p.IsActive,
                        p.Id
                    FROM Properties p
                    WHERE 
                        -- Only include Maintenance or Construction property types
                        p.PropertyType IN ('Maintenance', 'Construction')
                        -- Exclude test or demo properties
                        AND (p.PropertyName NOT LIKE '%test%' OR p.PropertyName IS NULL)
                        AND (p.PropertyName NOT LIKE '%demo%' OR p.PropertyName IS NULL)
                        -- Ensure we have a property name
                        AND p.PropertyName IS NOT NULL
                    ORDER BY p.PropertyName ASC;
                END
            ");
        }
    }
}
