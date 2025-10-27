export interface SearchParameter{
    // general 
    searchTerm? : string;
    isArchived? : boolean;
    pageNumber : number;
    pageSize : number;
}

// supplier
export interface SupplierSearchParameter extends SearchParameter{
}