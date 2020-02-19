import { Sequelize } from 'sequelize';
import SequelizeAdapterConfig from "./SequelizeAdapterConfig";

export default class SequelizeAdapter {

    dialect: 'mysql' | 'postgres';
    config: SequelizeAdapterConfig;

    sequelize: Sequelize;

    constructor(dialect: 'mysql' | 'postgres', config: SequelizeAdapterConfig) {
        this.dialect = dialect;
        this.config = config;
        this.sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host, port: parseInt(config.port),
            dialect: dialect
        })
    }

    async connect() {
        return this.sequelize.authenticate();
    }

    async disconnect() {
        return this.sequelize.close();
    }

}
