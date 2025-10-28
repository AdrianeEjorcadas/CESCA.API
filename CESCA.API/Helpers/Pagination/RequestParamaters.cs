namespace CESCA.API.Helpers.Pagination
{
    /// <summary>
    ///  Parameter used when retriving data (incldues filters like search and other fields)
    /// </summary>
    public abstract class RequestParamaters
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }

        //Filters
        public string? SearchTerm { get; set; }
        public bool? IsArchived { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
