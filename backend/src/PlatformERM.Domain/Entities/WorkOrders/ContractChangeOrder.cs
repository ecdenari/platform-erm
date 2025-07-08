using PlatformERM.Domain.Common;
using System;

namespace PlatformERM.Domain.Entities.WorkOrders
{
    /// <summary>
    /// Represents a change order for a contract
    /// </summary>
    public class ContractChangeOrder : BaseEntity
    {
        /// <summary>
        /// Gets or sets the contract ID this change order belongs to
        /// </summary>
        public int ContractId { get; set; }

        /// <summary>
        /// Gets or sets the change order number
        /// </summary>
        public string ChangeOrderNumber { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the description of the change
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the reason for the change
        /// </summary>
        public string? Reason { get; set; }

        /// <summary>
        /// Gets or sets the original amount
        /// </summary>
        public decimal OriginalAmount { get; set; }

        /// <summary>
        /// Gets or sets the change amount (can be positive or negative)
        /// </summary>
        public decimal ChangeAmount { get; set; }

        /// <summary>
        /// Gets or sets the new total amount
        /// </summary>
        public decimal NewTotalAmount { get; set; }

        /// <summary>
        /// Gets or sets the status of the change order
        /// </summary>
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

        /// <summary>
        /// Gets or sets the date the change order was requested
        /// </summary>
        public DateTime RequestedDate { get; set; }

        /// <summary>
        /// Gets or sets the date the change order was approved/rejected
        /// </summary>
        public DateTime? ApprovedDate { get; set; }

        /// <summary>
        /// Gets or sets who approved the change order
        /// </summary>
        public string? ApprovedBy { get; set; }

        /// <summary>
        /// Gets or sets any notes about the approval/rejection
        /// </summary>
        public string? ApprovalNotes { get; set; }

        // Navigation properties
        public virtual Contract Contract { get; set; } = null!;
    }
}