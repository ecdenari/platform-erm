using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Domain.Entities;
namespace PureGreenLandGroup.Domain.UsersResources
{
    public interface IUserRepository : IRepository<MstUsersDetails>
    {
        Task<IEnumerable<MstUsersDetails>> GetUsers();

        Task<MstUsersDetails> GetByUsername(string username);

        Task<MstUsersDetails> GetById(int userId);

       

    }
}
