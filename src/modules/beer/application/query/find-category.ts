import { PrismaClient } from '@prisma/client'

export class FindCategoryQuery {
	id: string

	constructor(params: FindCategoryQuery) {
		Object.assign(this, params)
	}
}
export interface FindCategoryHandler {
	execute(query: FindCategoryQuery): Promise<{
		id: string
		name: string
		createdAt: Date
		updatedAt: Date
	} | null>
}
export class FindCategoryHandlerImpl implements FindCategoryHandler {
	constructor(private readonly prismaClient: PrismaClient) {}

	async execute(query: FindCategoryQuery) {
		const category = await this.prismaClient.category.findUnique({
			where: {
				id: query.id,
			},
		})

		return category
	}
}
