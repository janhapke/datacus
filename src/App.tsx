import React, { useState } from 'react';
import { Button, ControlGroup, InputGroup, Alert, Intent } from "@blueprintjs/core";
import DBAL from './dbal/DBAL';
import { Adapter } from './dbal/Adapter';

export const App = () => {

    const [adapter, setAdapter] = useState("mysql");
    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState("3306");
    const [username, setUsername] = useState("root");
    const [password, setPassword] = useState("password");
    const [database, setDatabase] = useState("mysql");

    const [connectionState, setConnectionState] = useState('IDLE');
    const [connection, setConnection] = useState<Adapter | null>(null);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(<></>);

    const showAlert = (e: Error) => {
        setAlertMessage(
            <>
                <h2>{e.name}</h2>
                <p>{e.message}</p>
                <code>
                    <pre style={{overflow: 'auto', maxWidth: '350px', fontSize: '75%'}}>{JSON.stringify(e, null, 2)}</pre>
                </code>
            </>
        );
        setIsAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertMessage(<></>);
        setIsAlertOpen(false);
        setConnectionState('IDLE');
    }

    const connect = async () => {
        console.log('Connect', { adapter, host, port, username, password, database });
        try {
            setConnectionState('CONNECTING');
            const connection = DBAL.getAdapter(adapter, {
                host: host,
                port: port,
                username: username,
                password: password,
                database: database
            });
            await connection.connect()
            setConnection(connection);
            setConnectionState('CONNECTED');
            console.log('connection', connection);
        } catch (e) {
            setConnection(null);
            setConnectionState('ERROR');
            showAlert(e);
            console.error(e);
        }
    }

    const disconnect = async () => {
        console.log('Disconnect');
        if (connection) {
            await connection.disconnect();
            setConnection(null);
            setConnectionState('IDLE');
        }
    }

    const handleConnectionKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode == 13) {
            connect();
        }
    }

    let connectButtonIntent : 'primary' | 'danger' | 'success' = 'primary';
    if (connectionState == 'ERROR') {
        connectButtonIntent = 'danger';
    }
    if (connectionState == 'CONNECTED') {
        connectButtonIntent = 'success';
    }

    return (
        <>
            <Alert confirmButtonText="OK" intent={Intent.DANGER} isOpen={isAlertOpen} onClose={handleAlertClose} canEscapeKeyCancel={true}>
                {alertMessage}
            </Alert>
            <div style={{flex: 'none', marginBottom: '1rem'}}>
                <ControlGroup fill={true} vertical={false}>
                    <select className="bp3-select" value={adapter} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setAdapter((event.target as HTMLSelectElement).value)}>
                        <option value="mysql">mysql</option>
                        <option value="postgres">postgresql</option>
                    </select>
                    <InputGroup value={host}     onKeyDown={handleConnectionKeyDown} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setHost((event.target as HTMLInputElement).value)} placeholder="Host" type="text" />
                    <InputGroup value={port}     onKeyDown={handleConnectionKeyDown} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setPort((event.target as HTMLInputElement).value)} placeholder="Port" type="text" />
                    <InputGroup value={username} onKeyDown={handleConnectionKeyDown} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setUsername((event.target as HTMLInputElement).value)} placeholder="Username" type="text" />
                    <InputGroup value={password} onKeyDown={handleConnectionKeyDown} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setPassword((event.target as HTMLInputElement).value)} placeholder="Password" type="password"/>
                    <InputGroup value={database} onKeyDown={handleConnectionKeyDown} disabled={connectionState == 'CONNECTING'} onChange={(event:React.FormEvent<HTMLElement>) => setDatabase((event.target as HTMLInputElement).value)} placeholder="Database" type="text"/>
                    {connectionState == 'CONNECTED'
                        ? <Button intent={connectButtonIntent} text="Disconnect" onClick={disconnect} style={{minWidth: '7em', maxWidth: '7em'}} />
                        : <Button intent={connectButtonIntent} text="Connect" disabled={connectionState == 'CONNECTING'} onClick={connect} style={{minWidth: '6em', maxWidth: '6em'}} />
                    }

                </ControlGroup>
            </div>
        </>
    );
}
