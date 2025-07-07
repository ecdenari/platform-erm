#nullable disable
using System.ComponentModel.DataAnnotations;
namespace PureGreenLandGroup.Domain.Entities
{
    public class MstRoles
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
