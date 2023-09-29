const jsonServer= require('json-server');

const annualrain=require('./exports/Annual-Rain-All-Years.json');
const slums=require('./exports/bangladesh_slums_total (1).json');
const months=require('./exports/Month-FiveYears.json');
const population=require('./exports/PThreeYears.json');
const map=require("./exports/Map.json")

const server= jsonServer.create();
const router=jsonServer.router({annualrain, slums, months, population, map});
const middleware=jsonServer.defaults();
const port =process.env.BACKEND_PORT || 3001;

process.on('uncaughtException', (error)=>{
    console.error(`Uncaught exception: ${error}`);

    process.exit(1);
})

process.on('SIGTERM', ()=>{
    console.log('Received SIGTERM. Closing server...');

    server.close(()=>{
        console.log('Server closed.');

        process.exit(1);
    })
})

server.use(middleware);
server.use(router);

server.listen(port, ()=>{
    console.log(`Backend server is running on port ${port}`)
})


