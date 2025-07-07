using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.UsersResources;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;

namespace PureGreenLandGroup.Infrastructure.Repositories
{
    public class UserRepository : Repository<MstUsersDetails>, IUserRepository
    {
        public UserRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }

        public async Task<IEnumerable<MstUsersDetails>> GetUsers()
        {
            return await List(x => x.IsActive).ToListAsync();
        }
        public async Task<MstUsersDetails> GetByUsername(string username)
        {
            var user = await List(x => x.Email == username).FirstOrDefaultAsync();
            return user!;
        }


        public async Task<MstUsersDetails> GetById(int userId)
        {
            var user = await List(x => x.Id == userId).FirstOrDefaultAsync();
            return user!;
        }



    }
}
