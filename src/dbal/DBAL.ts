import { Adapter, AdapterConfig } from "./Adapter";
import SequelizeAdapter from "./sequelize/SequelizeAdapter";
import SequelizeAdapterConfig from "./sequelize/SequelizeAdapterConfig";

export default class DBAL {

    static getAdapter(adapter: string, config: AdapterConfig) : Adapter {
        console.log('DBAL.getAdapter', adapter);
        if (adapter == 'mysql' || adapter == 'postgres') {
            return new SequelizeAdapter(adapter, config);
        }
        throw new Error('Unsupported Adapter!');
    }

};
