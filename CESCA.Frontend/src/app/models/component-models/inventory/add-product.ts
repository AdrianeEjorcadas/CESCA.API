export interface AddProduct{
    productName: string,
    genericName: string,
    category: string,
    subCategory: string,
    brand: string,
    form: string,
    strengthOrSize: string,
    unitSize: string,
    price: number,
    stockQuantity: number,
    reorderLevel: number,
    isPerishable: boolean,
    expirationDate: string, // convert manually
    isPrescriptionOnly: boolean,
    barCode: string,

    //location metadata
    shelfLocation: string,
    rackNumber: string,
    aisle: string,

    //foreign key for supplier
    supplierId: string  
}