import { AdapterConfig } from '../Adapter';

export default class SequelizeAdapterConfig implements AdapterConfig {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    constructor(
        host: string,
        port: string,
        username: string,
        password: string,
        database: string,
    ) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
    }
}
