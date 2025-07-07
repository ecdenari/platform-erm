using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.IRepositories;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;


namespace PureGreenLandGroup.Infrastructure.Repositories
{
    public class ControllerRepository : Repository<Controllers>, IControllerRepository
    {
        public ControllerRepository(DbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
