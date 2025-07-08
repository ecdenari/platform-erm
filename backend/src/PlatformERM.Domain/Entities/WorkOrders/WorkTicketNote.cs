using PlatformERM.Domain.Common;
using System;

namespace PlatformERM.Domain.Entities.WorkOrders
{
    /// <summary>
    /// Represents a note attached to a work ticket
    /// </summary>
    public class WorkTicketNote : BaseEntity
    {
        /// <summary>
        /// Gets or sets the work ticket ID this note belongs to
        /// </summary>
        public int WorkTicketId { get; set; }

        /// <summary>
        /// Gets or sets the note content
        /// </summary>
        public string Note { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the note type
        /// </summary>
        public string NoteType { get; set; } = "General"; // General, Internal, Customer, Technical

        /// <summary>
        /// Gets or sets whether this note is visible to customers
        /// </summary>
        public bool IsVisibleToCustomer { get; set; }

        /// <summary>
        /// Gets or sets whether this note is pinned/important
        /// </summary>
        public bool IsPinned { get; set; }

        /// <summary>
        /// Gets or sets the date and time the note was created
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets who created the note
        /// </summary>
        public string CreatedByName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the user role of who created the note
        /// </summary>
        public string? CreatedByRole { get; set; }

        // Navigation properties
        public virtual WorkTicket WorkTicket { get; set; } = null!;
    }
}