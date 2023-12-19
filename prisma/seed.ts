import 'module-alias/register'

import { beers } from '@/data/beers'
import { CreateBeerHandlerImpl } from '@/modules/beer/application/command/create-beer'
import { CreateBeerSqlRepository } from '@/modules/beer/infra/repository/sql/create-beer'

async function main() {
	const createBeerHandler = new CreateBeerHandlerImpl(new CreateBeerSqlRepository())

	beers.forEach(async (beer) => {
		await createBeerHandler.execute(beer)
	})
}

main()
