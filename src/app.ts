import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {Signale} from "signale";

import { setupUserEndpoints } from './user_management/infraestructure/endpoints/UserEndpoints';
import cors from 'cors';
import { setupTagEndpoints } from './user_management/infraestructure/endpoints/TagEndpoints';
import { setupUserTagEndpoints } from './user_management/infraestructure/endpoints/UserTagEndpoints';
import { rateLimiter } from './middleware/RateLimiter';
import { setupChatEndpoints } from './chat_management/infraestructure/endpoints/ChatEndpoint';
import { setupMessageEndpoints } from './chat_management/infraestructure/endpoints/MessageEndpoint';
dotenv.config();


const app = express();
const signale = new Signale();
app.use(cors());
app.use(express.json());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(rateLimiter);

const HOST:string = process.env.HOST_SERVER || '0.0.0.0';
const PORT:number  = Number(process.env.PORT_SERVER) || 3001;

app.use(express.json()); 
app.use(morgan('dev'))
setupUserEndpoints(app);
setupTagEndpoints(app);
setupUserTagEndpoints(app);
setupChatEndpoints(app);
setupMessageEndpoints(app);

let server = null;

async function startServer() {
    server = app.listen(3001, HOST, () => {
        signale.success(`Server is running on http://${HOST}:${3001}`);
    });
}
startServer();

export { app, server };