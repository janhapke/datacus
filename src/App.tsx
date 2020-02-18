import React, { useState } from 'react';
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";


export const App = () => {
    console.log('👋 This message is being logged by "App.tsx" via react');

    const [adapter, setAdapter] = useState("mysql");
    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState("3306");
    const [username, setUsername] = useState("root");
    const [password, setPassword] = useState("password");
    const [database, setDatabase] = useState("mysql");

    const connect = () => {
        console.log(
            'Connect',
            {
                adapter: adapter,
                host: host,
                port: port,
                username: username,
                password: password,
                database: database
            }
        );
    }

    const handleConnectionKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode == 13) {
            connect();
        }
    }

    return (
        <>
            <div style={{flex: 'none', marginBottom: '1rem'}}>
                <ControlGroup fill={true} vertical={false}>
                    <select className="bp3-select" value={adapter} onChange={(event:React.FormEvent<HTMLElement>) => setAdapter((event.target as HTMLSelectElement).value)}>
                        <option value="mysql">mysql</option>
                        <option value="postgres">postgresql</option>
                    </select>
                    <InputGroup value={host}     onKeyDown={handleConnectionKeyDown} onChange={(event:React.FormEvent<HTMLElement>) => setHost((event.target as HTMLInputElement).value)} placeholder="Host" type="text" />
                    <InputGroup value={port}     onKeyDown={handleConnectionKeyDown} onChange={(event:React.FormEvent<HTMLElement>) => setPort((event.target as HTMLInputElement).value)} placeholder="Port" type="text" />
                    <InputGroup value={username} onKeyDown={handleConnectionKeyDown} onChange={(event:React.FormEvent<HTMLElement>) => setUsername((event.target as HTMLInputElement).value)} placeholder="Username" type="text" />
                    <InputGroup value={password} onKeyDown={handleConnectionKeyDown} onChange={(event:React.FormEvent<HTMLElement>) => setPassword((event.target as HTMLInputElement).value)} placeholder="Password" type="password"/>
                    <InputGroup value={database} onKeyDown={handleConnectionKeyDown} onChange={(event:React.FormEvent<HTMLElement>) => setDatabase((event.target as HTMLInputElement).value)} placeholder="Database" type="text"/>
                    <Button text="Connect" onClick={connect} style={{minWidth: '5em', maxWidth: '5em'}} />
                </ControlGroup>
            </div>
        </>
    );
}
