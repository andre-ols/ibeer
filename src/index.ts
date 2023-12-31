import 'module-alias/register'

import { beerRouter } from './modules/beer/router'
import { app } from './modules/core/api/http/express'
import { mongoService } from './modules/core/database/nosql/mongo-service'
import { env } from './modules/core/env'
import { orderRouter } from './modules/order/router'

mongoService.connect(env.MONGO_URL)

app.use('/beer', beerRouter)

app.use('/checkout', orderRouter)

app.listen(3333, () => {
	console.log('Server listening on port 3000')
})
