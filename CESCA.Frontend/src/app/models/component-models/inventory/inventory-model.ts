export interface InventoryModel{
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
    reorderLeve: number,
    isPerishable: boolean,
    expirationDate: string, // convert manually
    isPrescriptionOnly: boolean,
    barCode: string,
    supplierId: string,

    //location metadata
    shelfLocation: string,
    rackNumber: string,
    aisle: string

    isArchived: boolean,
    isDeleted: boolean
}