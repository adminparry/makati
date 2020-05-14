const fallback = (...args) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    (res.sendFile || res.sendfile).call(res, ...args, err => err && next())
  } else next()
}

const port = process.env.port || 3000;
const app = require('./src');
const { resolve } = require('path');
// 如果你使用单页面应用前端路由使用history方式

app.use(fallback(resolve(__dirname, './views/index.html')))
app.listen(port);
app.set('x-powered-by', false);
