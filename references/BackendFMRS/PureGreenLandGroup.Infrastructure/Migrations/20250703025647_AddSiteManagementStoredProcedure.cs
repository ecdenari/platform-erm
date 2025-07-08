using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSiteManagementStoredProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SiteReportTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Sections = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "int", nullable: false),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedByUserID = table.Column<int>(type: "int", nullable: true),
                    ModifiedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteReportTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    TemplateId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "int", nullable: false),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompletedByUserID = table.Column<int>(type: "int", nullable: true),
                    CompletedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByUserID = table.Column<int>(type: "int", nullable: true),
                    ModifiedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GPSLatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GPSLongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WeatherConditions = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Temperature = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OverallScore = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaxPossibleScore = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteReports_Properties_PropertyID",
                        column: x => x.PropertyID,
                        principalTable: "Properties",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SiteReports_SiteReportTemplates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "SiteReportTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SiteReportSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportId = table.Column<int>(type: "int", nullable: false),
                    SectionName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    SectionType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaxScore = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ScoreType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ScoreLabel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Recommendations = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SectionOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteReportSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteReportSections_SiteReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "SiteReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SiteReportIssues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportId = table.Column<int>(type: "int", nullable: false),
                    SectionId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    IssueType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    GPSLatitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GPSLongitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GPSAccuracy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Resolution = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    ActionRequired = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    TargetResolutionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualResolutionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EstimatedCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ActualCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AssignedToUserID = table.Column<int>(type: "int", nullable: true),
                    AssignedToUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    AssignedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReportedByUserID = table.Column<int>(type: "int", nullable: false),
                    ReportedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ReportedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResolvedByUserID = table.Column<int>(type: "int", nullable: true),
                    ResolvedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ResolvedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RequiresFollowUp = table.Column<bool>(type: "bit", nullable: false),
                    FollowUpDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FollowUpNotes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    WorkOrderNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ExternalTicketNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteReportIssues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteReportIssues_SiteReportSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "SiteReportSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SiteReportIssues_SiteReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "SiteReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "SiteReportPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportId = table.Column<int>(type: "int", nullable: false),
                    SectionId = table.Column<int>(type: "int", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    FileSize = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MimeType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Caption = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GPSLatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GPSLongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GPSAccuracy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoTakenDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeviceInfo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PhotoType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IssueType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Annotations = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    UploadedByUserID = table.Column<int>(type: "int", nullable: false),
                    UploadedByUserName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UploadedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PhotoOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SiteReportIssueId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteReportPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteReportPhotos_SiteReportIssues_SiteReportIssueId",
                        column: x => x.SiteReportIssueId,
                        principalTable: "SiteReportIssues",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SiteReportPhotos_SiteReportSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "SiteReportSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SiteReportPhotos_SiteReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "SiteReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportIssues_ReportId",
                table: "SiteReportIssues",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportIssues_SectionId",
                table: "SiteReportIssues",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportIssues_Status",
                table: "SiteReportIssues",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportPhotos_ReportId",
                table: "SiteReportPhotos",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportPhotos_SectionId",
                table: "SiteReportPhotos",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportPhotos_SiteReportIssueId",
                table: "SiteReportPhotos",
                column: "SiteReportIssueId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReports_PropertyID",
                table: "SiteReports",
                column: "PropertyID");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReports_ReportDate",
                table: "SiteReports",
                column: "ReportDate");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReports_Status",
                table: "SiteReports",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReports_TemplateId",
                table: "SiteReports",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_SiteReportSections_ReportId",
                table: "SiteReportSections",
                column: "ReportId");

            // Create stored procedure for Site Management properties
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
                        ps.PropertyStatusName,
                        b.BranchName,
                        p.AccountOwnerContactName,
                        p.ProductionManagerContactName,
                        p.IsActive
                    FROM Properties p
                    LEFT JOIN PropertyStatus ps ON p.PropertyStatusID = ps.Id
                    LEFT JOIN Branch b ON p.BranchID = b.Id
                    WHERE 
                        p.IsActive = 1
                        AND (
                            -- Include properties with Active or Maintenance status
                            ps.PropertyStatusName IN ('Active', 'Maintenance')
                            OR 
                            -- Include customer properties (those with account owners)
                            p.AccountOwnerContactName IS NOT NULL
                            OR
                            -- Include properties with production managers (indicates active management)
                            p.ProductionManagerContactName IS NOT NULL
                        )
                        -- Exclude test or demo properties
                        AND p.PropertyName NOT LIKE '%test%'
                        AND p.PropertyName NOT LIKE '%demo%'
                    ORDER BY p.PropertyName ASC;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop stored procedure
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[usp_GetSiteManagementPropertiesList]");

            migrationBuilder.DropTable(
                name: "SiteReportPhotos");

            migrationBuilder.DropTable(
                name: "SiteReportIssues");

            migrationBuilder.DropTable(
                name: "SiteReportSections");

            migrationBuilder.DropTable(
                name: "SiteReports");

            migrationBuilder.DropTable(
                name: "SiteReportTemplates");
        }
    }
}
