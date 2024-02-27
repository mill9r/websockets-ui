import { httpServer } from './src';

const port = Number(process.env.PORT) || 3000;

console.log(`Start static http server on the ${port} port!`);
httpServer.listen(port);
