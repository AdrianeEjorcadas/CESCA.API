﻿namespace CESCA.API.Helpers
{
    public class MetaData
    {
        //Metadata result to use in frontend
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public bool HasPrevious => CurrentPage > 1;
        public bool HasNextPage => CurrentPage < TotalPages;
    }
}
