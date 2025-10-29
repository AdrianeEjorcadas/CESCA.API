import { MetadataModel } from "./metadata-model"
import { SupplierModel } from "./supplier-model"


export interface SupplierResponse{
    suppliers: SupplierModel[],
    metadata: MetadataModel
}