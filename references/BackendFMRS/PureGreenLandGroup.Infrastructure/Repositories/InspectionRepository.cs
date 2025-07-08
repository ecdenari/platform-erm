using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.IRepositories;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;

namespace PureGreenLandGroup.Infrastructure.Repositories
{
    public class InspectionRepository : Repository<Controllers>, IControllerRepository
    {
        public InspectionRepository(DbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
