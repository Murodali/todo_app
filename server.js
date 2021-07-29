const jsonServer = require('json-server');
const server = jsonServer.create();
const userRouter = jsonServer.router('./users.json');
const todoRouter = jsonServer.router('./todos.json');
const middlewares = jsonServer.defaults({
    static: './build'
})

const PORTUSERS = process.env.PORT || 8000;
const PORTTODOS = process.env.PORT || 5000;
server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*' : '/$1',
}))

server.use(userRouter);
server.listen(PORTUSERS, () => {
    console.log(`Users server is listening ${PORTUSERS}`);
})

server.use(todoRouter);
server.listen(PORTTODOS, () => {
    console.log("Todos server is listening",PORTTODOS);
})


