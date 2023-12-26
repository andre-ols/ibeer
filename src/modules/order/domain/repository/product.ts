import { Product } from '../model/product'

export interface CreateProductRepository {
	execute(product: Product): Promise<void>
}
