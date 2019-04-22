const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const app = new Koa()

app.keys = ['hi look']
app.use(logger())
app.use(session(app))

app.use(ctx =>{
  if(ctx.path ==='/'){
    let n = ctx.session.views||0
    ctx.session.views = (n+1)
    ctx.body = n+ 'views'
  } else if (ctx.path==='/hi'){
    ctx.body = 'hi look'
  } else {
    ctx.body = '404'
  }
})  
app.listen(2333)