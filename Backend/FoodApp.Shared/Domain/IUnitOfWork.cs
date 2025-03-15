namespace FoodApp.Shared.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// save entity with publish domain event
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default, bool publishDomainEvent = false);
    }
}
