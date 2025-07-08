using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.IRepositories;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;

namespace PureGreenLandGroup.Infrastructure.Repositories
{
    public class ZoneRepository : Repository<ControllerZones>, IZoneRepository
    {
        public ZoneRepository(DbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
