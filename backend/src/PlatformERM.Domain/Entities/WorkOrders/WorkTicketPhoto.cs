using PlatformERM.Domain.Common;
using System;

namespace PlatformERM.Domain.Entities.WorkOrders
{
    /// <summary>
    /// Represents a photo attached to a work ticket
    /// </summary>
    public class WorkTicketPhoto : BaseEntity
    {
        /// <summary>
        /// Gets or sets the work ticket ID this photo belongs to
        /// </summary>
        public int WorkTicketId { get; set; }

        /// <summary>
        /// Gets or sets the photo file name
        /// </summary>
        public string FileName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the photo file path or URL
        /// </summary>
        public string FilePath { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the photo title/caption
        /// </summary>
        public string? Title { get; set; }

        /// <summary>
        /// Gets or sets the photo description
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the photo category
        /// </summary>
        public string Category { get; set; } = "General"; // Before, During, After, Issue, Completion

        /// <summary>
        /// Gets or sets the file size in bytes
        /// </summary>
        public long FileSize { get; set; }

        /// <summary>
        /// Gets or sets the MIME type
        /// </summary>
        public string MimeType { get; set; } = "image/jpeg";

        /// <summary>
        /// Gets or sets when the photo was taken
        /// </summary>
        public DateTime? PhotoTakenDate { get; set; }

        /// <summary>
        /// Gets or sets when the photo was uploaded
        /// </summary>
        public DateTime UploadedDate { get; set; }

        /// <summary>
        /// Gets or sets who uploaded the photo
        /// </summary>
        public string UploadedByName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets whether this photo is visible to customers
        /// </summary>
        public bool IsVisibleToCustomer { get; set; } = true;

        /// <summary>
        /// Gets or sets the display order
        /// </summary>
        public int DisplayOrder { get; set; }

        /// <summary>
        /// Gets or sets GPS latitude if available
        /// </summary>
        public double? Latitude { get; set; }

        /// <summary>
        /// Gets or sets GPS longitude if available
        /// </summary>
        public double? Longitude { get; set; }

        // Navigation properties
        public virtual WorkTicket WorkTicket { get; set; } = null!;
    }
}