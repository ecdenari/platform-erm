using System.Linq.Expressions;

namespace PureGreenLandGroup.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);

        

        public void AddRange(List<T> entities);

        void Delete(T entity);

        void Update(T entity);

        IEnumerable<T> List();

        IQueryable<T> List(Expression<Func<T, bool>> expression);
    }
}
