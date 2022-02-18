import { Server } from "./data-access/models/server";
import { DB } from "./database/config";

const server = new Server(new DB());
server.listen();
