using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    [Table("MstUsersDetails")]
    public class MstUsersDetails
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CompanyName { get; set; }
        public string? Email { get; set; }
        public string? PrimaryPhone { get; set; }
        public string? MobilePhone { get; set; }
        public bool IsActive { get; set; }
        public string? ContactTagList { get; set; }
        public string? ContactType { get; set; }
        public string? CreatedByUser { get; set; }
        public DateOnly? CreatedDate { get; set; }
        public int? EmployeeNumber { get; set; }
        public string? Title { get; set; }
        public string? Password { get; set; }
        public bool IsDeleted { get; set; }
        public int RoleId { get; set; }
        public bool PasswordResetFlag { get; set; }

        [ForeignKey("RoleId")]
        public virtual MstRoles MstRoles { get; set; }
    }
}
