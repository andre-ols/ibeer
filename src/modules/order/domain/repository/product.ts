import { Product } from '../model/product'

export interface CreateProductRepository {
	execute(product: Product): Promise<void>
}

export interface FindProductRepository {
	execute(id: string): Promise<Product | null>
}
