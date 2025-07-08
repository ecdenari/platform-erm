using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.IRepositories;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;

namespace PureGreenLandGroup.Infrastructure.Repositories
{
    public class PropertiesRepository : Repository<Properties>, IPropertiesRepository
    {
        public PropertiesRepository(DbFactory dbFactory) : base(dbFactory)
        {
            
        }
    }
}
