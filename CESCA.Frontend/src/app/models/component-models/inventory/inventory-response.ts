import { MetadataModel } from "../metadata-model";
import { InventoryModel } from "./inventory-model";

export interface InventoryResponse{
    products: InventoryModel[],
    metaData: MetadataModel
}