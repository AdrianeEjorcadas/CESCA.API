export interface UpdateInventoryModel{
    productId: string,
    productName: string,
    genericName: string,
    category: string,
    subCategory: string,
    brand: string,
    form: string,
    strengthOrSize: string,
    unitSize: string,
    price: string, //STRING FOR NOW
    stockQuantity: number,
    reorderLevel: number,
    isPerishable: boolean,
    expirationDate: string, // convert manually
    isPrescriptionOnly: boolean,
    barcode: string,
    supplierId: string,

    //location metadata
    shelfLocation: string,
    rackNumber: string,
    aisle: string

    isArchived: boolean
}