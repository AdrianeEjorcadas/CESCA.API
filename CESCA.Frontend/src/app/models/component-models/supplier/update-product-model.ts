import { InventoryModel } from "../inventory/inventory-model";

export interface UpdateProductModel{
    inventoryModel: InventoryModel,
    updatedBy: string
}