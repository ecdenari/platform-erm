using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Domain.IRepositories;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Repositories;

namespace PureGreenLandGroup.Infrastructure.Generic
{
    public class UnitOfWork : IUnitOfWork
    {
        private DbFactory _dbFactory;
        /// <summary>
        /// The repositories
        /// </summary>
        private Dictionary<Type, object> repositories;

        public UnitOfWork(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public Task<int> CommitAsync()
        {
            return _dbFactory.DbContext.SaveChangesAsync();
        }

        public int Commit()
        {
            return _dbFactory.DbContext.SaveChanges();
        }

        //public IPropertiesRepository PropertiesRepository
        //{
        //    get { return new PropertiesRepository(_dbFactory); }
        //}

        /// <summary>
        /// Gets the repository.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity.</typeparam>
        /// <returns></returns>
        public IRepository<TEntity> GetRepository<TEntity>()
            where TEntity : class
        {
            if (this.repositories == null)
            {
                this.repositories = new Dictionary<Type, object>();
            }

            var type = typeof(TEntity);
            if (!this.repositories.ContainsKey(type))
            {
                this.repositories[type] = new Repository<TEntity>(this._dbFactory);
            }

            return (IRepository<TEntity>)this.repositories[type];
        }
    }
}
