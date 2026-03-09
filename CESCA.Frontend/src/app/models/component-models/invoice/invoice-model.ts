export interface InvoiceModel{
    invoiceNumber: string,
    orderDate: Date,
    orderAmount: number,
    discountApplied: boolean,
    finalAmount: number,
    status?: string,
    processBy: string
}