import { ArgumentParser } from 'argparse';
import * as server from './grpc/grpc.server';
import logger from './utils/logger';

const argparser = new ArgumentParser({
    add_help: true,
    description: 'configuration server instance launcher'
})
argparser.add_argument('-p', '--port', {
    help: 'the port on which Trace Server runs',
    type: Number
});
const args = argparser.parse_args() as { port: number };
const port = args.port ? args.port : 5000;
server.start(`0.0.0.0:${port}`).catch((err) => {
    logger.error('start grpc error.', err);
});
