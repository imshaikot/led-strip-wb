import * as React from 'react';
import { useContext, useState } from 'react';
import { FaBluetoothB } from "react-icons/fa";
import { Spinner, Card, Button } from 'react-bootstrap';
import AppContext from '../app.context';

const Scan = () => {
    const { 
        uuid,
        cuuid,
        loading,
        setLoading,
        setDevice,
        setConnected,
        setRequest,
        setServices, 
        setWritableCharacteristic 
    } = useContext(AppContext);
    const onScan = async () => {
        setLoading(true);
        try {
            const requestDevice = await (navigator as any).bluetooth.requestDevice({ filters: [
                { namePrefix: 'Triones' },
            ],
            optionalServices: [uuid],
            });
            const device = await requestDevice.gatt.connect();
            const BTServices = await device.getPrimaryServices();
            const characteristic = await BTServices[0].getCharacteristic(cuuid);
            setServices(BTServices);
            setWritableCharacteristic(characteristic);
            setDevice(device);
            setRequest(requestDevice);
            setConnected(true);
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }
    return (
        <Card body>
            {loading ? (
                <div className="ble-hbox" style={{ margin: 100 }}>
                    <Spinner animation="border" variant="primary" style={{ marginRight: 10 }} />
                    <span>scanning...</span>
                </div>
            ) : (
                <>
                    <Card.Title>LED Strip</Card.Title>
                    <Card.Text>
                        This is an experimental project for <i>Triones</i> based LED using Web Bluetooth API 
                    </Card.Text>
                    <Button onClick={onScan} variant="primary" size="lg">
                        <FaBluetoothB size="25" style={{ marginRight: 5 }} />
                            SCAN
                    </Button>
                </>
            )}
        </Card>
    )
}

export default Scan;