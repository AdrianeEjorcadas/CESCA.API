import { MetadataModel } from "../metadata-model";
import { InvoiceModel } from "./invoice-model";

export interface InvoiceResponseModel{
    orders: InvoiceModel[],
    metaData: MetadataModel
}