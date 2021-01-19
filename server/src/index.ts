import * as Koa from 'koa'
import * as Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { connectToDb } from './db'
import { DonateModel } from './Donate/model'

const app = new Koa()
const router = new Router()

const port = 4000

connectToDb().then(() => {
  router.post('/donate', async (ctx, next) => {
    const donate = ctx.request.body
    try {
      await DonateModel.create(donate)
      ctx.body = { ok: true }
      next()
    } catch (e) {
      console.error(e)
    }
  })

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(port, () => {
    console.log(`app runs on ${port} port`)
  })
})
