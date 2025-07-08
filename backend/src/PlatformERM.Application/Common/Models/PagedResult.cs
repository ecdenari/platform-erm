namespace PlatformERM.Application.Common.Models;

/// <summary>
/// Represents a paginated result set
/// </summary>
/// <typeparam name="T">The type of items in the result set</typeparam>
public class PagedResult<T>
{
    /// <summary>
    /// The items in the current page
    /// </summary>
    public IEnumerable<T> Items { get; set; } = new List<T>();
    
    /// <summary>
    /// Total count of all items across all pages
    /// </summary>
    public int TotalCount { get; set; }
    
    /// <summary>
    /// Current page number (1-based)
    /// </summary>
    public int PageNumber { get; set; }
    
    /// <summary>
    /// Number of items per page
    /// </summary>
    public int PageSize { get; set; }
    
    /// <summary>
    /// Total number of pages
    /// </summary>
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    
    /// <summary>
    /// Indicates if there is a previous page
    /// </summary>
    public bool HasPrevious => PageNumber > 1;
    
    /// <summary>
    /// Indicates if there is a next page
    /// </summary>
    public bool HasNext => PageNumber < TotalPages;
}