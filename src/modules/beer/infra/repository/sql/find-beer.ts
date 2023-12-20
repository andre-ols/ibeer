import { BeerBuilder } from '@/modules/beer/domain/aggreagate/beer'
import { CategoryBuilder } from '@/modules/beer/domain/model/category'
import { Abv } from '@/modules/beer/domain/value-object/abv'
import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { Ebc } from '@/modules/beer/domain/value-object/ebc'
import { Ibu } from '@/modules/beer/domain/value-object/ibu'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { NotFoundError } from '@/modules/core/errors/not-found'
import { PrismaClient } from '@prisma/client'
import { FindBeerRepository } from '../../../domain/repository/beer'

export class FindBeerSqlRepository implements FindBeerRepository {
	constructor(private readonly prismaClient: PrismaClient) {}
	async execute(params: FindBeerRepository.Params): Promise<FindBeerRepository.Result> {
		const data = await this.prismaClient.beer.findUnique({
			where: {
				id: params.id,
			},
			include: {
				category: true,
			},
		})

		if (!data) {
			throw new NotFoundError(`Beer with id ${params.id}`)
		}

		return new BeerBuilder()
			.withId(data.id)
			.withName(data.name)
			.withDescription(data.description)
			.withImageUrl(data.imageUrl)
			.withAbv(new Abv(Number(data.abv)))
			.withIbu(new Ibu(data.ibu))
			.withEbc(new Ebc(data.ebc))
			.withCategory(
				new CategoryBuilder()
					.withId(data.category.id)
					.withName(data.category.name)
					.withCreatedAt(new CreatedAt(data.category.createdAt))
					.withUpdatedAt(new UpdatedAt(data.category.updatedAt))
					.build(),
			)
			.withFoodPairing(data.foodPairing)
			.withBrewersTips(data.brewersTips)
			.withCreatedAt(new CreatedAt(data.createdAt))
			.withUpdatedAt(new UpdatedAt(data.updatedAt))
			.build()
	}
}
