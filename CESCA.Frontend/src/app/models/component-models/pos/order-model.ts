export interface OrderModel{
    payment: number,
    change: number,
    orderAmount: number,
    discountApplied: boolean,
    finalAmount: number,
    status: string
    processBy: string,
}