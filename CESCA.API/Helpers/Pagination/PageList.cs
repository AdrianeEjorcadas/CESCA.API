﻿namespace CESCA.API.Helpers.Pagination
{
    public class PagedList<T> : List<T>
    {
       // Metadata for frontend
        public MetaData MetaData { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };

            AddRange(items);
        }

        //Return value
        public static PagedList<T> ToPagedList(IEnumerable<T> source, int count, int pageNumber, int pageSize)
        {
            var items = source.ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        } 
    }
}
