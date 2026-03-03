import { OrderDetailsModel } from "./order-details-model";
import { OrderModel } from "./order-model";

export interface CreateOrderRequest{
    OrderDTO: OrderModel,
    OrderDetailsDTO: OrderDetailsModel[]
}