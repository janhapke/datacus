export interface AdapterConfig {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
}

export interface Adapter {
    connect(): void;
    disconnect(): void;
}
