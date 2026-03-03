export interface OrderModel{
    payment: number,
    change: number,
    orderAmount: number,
    discountedApplied: boolean,
    finalAmount: number,
    status: string
    processBy: string,
}