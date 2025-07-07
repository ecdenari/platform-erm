using PureGreenLandGroup.Domain.IRepositories;

namespace PureGreenLandGroup.Domain.Interfaces
{
    public interface IUnitOfWork
    {
       // IPropertiesRepository PropertiesRepository { get; }

      
        /// <summary>
        /// Saves all pending changes
        /// </summary>
        /// <returns>The number of objects in an Added, Modified, or Deleted state</returns>
        int Commit();

        /// <summary>
        /// Saves all pending changes Async
        /// </summary>
        /// <returns></returns>
        Task<int> CommitAsync();

        /// <summary>
        /// Gets the repository.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity.</typeparam>
        /// <returns>Repository</returns>
        IRepository<TEntity> GetRepository<TEntity>()
            where TEntity : class;

        /// <summary>
        /// Gets the Async repository.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity.</typeparam>
        /// <returns>Repository</returns>
        //Task<IAsyncRepository<TEntity>> GetAsyncRepository<TEntity>()
        //    where TEntity : class;
    }
}
