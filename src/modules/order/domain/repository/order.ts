import { Order } from '../aggregate/order'

export interface CreateOrderRepository {
	execute(order: Order): Promise<void>
}
