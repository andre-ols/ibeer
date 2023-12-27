import { PrismaClient } from '@prisma/client'
import { Product } from '../../../domain/model/product'
import { CreateProductRepository } from '../../../domain/repository/product'

export class CreateProductSqlRepository implements CreateProductRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async execute(product: Product): Promise<void> {
		await this.prismaClient.product.create({
			data: {
				id: product.id,
				price: product.price,
				createdAt: product.createdAt.getValue(),
				updatedAt: product.updatedAt.getValue(),
			},
		})
	}
}
