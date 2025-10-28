export interface SearchParameter{
    // general 
    searchTerm? : string;
    isArchived? : boolean;
    isDeleted? : boolean;
    // pagination
    pageNumber : number;
    pageSize : number;
}

// supplier
export interface SupplierSearchParameter extends SearchParameter{
}