import 'module-alias/register'

import { CreateBeerHandlerImpl } from '@/modules/beer/application/command/create-beer'
import { beers } from '@/modules/beer/infra/repository/in-memory/beers'
import { CreateBeerSqlRepository } from '@/modules/beer/infra/repository/sql/create-beer'

async function main() {
	const createBeerHandler = new CreateBeerHandlerImpl(new CreateBeerSqlRepository())

	beers.forEach(async (beer) => {
		await createBeerHandler.execute(beer)
	})
}

main()
