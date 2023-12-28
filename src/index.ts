import 'module-alias/register'

import { beerRouter } from './modules/beer/router'
import { app } from './modules/core/api/http/express'
import { connect } from './modules/core/db/nosql/connection'
import { orderRouter } from './modules/order/router'

connect()

app.use('/beer', beerRouter)

app.use('/checkout', orderRouter)

app.listen(3333, () => {
	console.log('Server listening on port 3000')
})
