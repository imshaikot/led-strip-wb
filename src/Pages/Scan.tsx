import * as React from 'react';
import { useContext, useState } from 'react';
import { FaBluetoothB } from "react-icons/fa";
import { Spinner, Card, Button } from 'react-bootstrap';
import appContext from '../app.context';

const Scan = () => {
    const { services, setServices } = useContext(appContext);
    const [ loading, setLoading ] = useState(false)
    const onScan = async () => {
        setLoading(true);
        try {
            const request = await (navigator as any).bluetooth.requestDevice({ filters: [{services: [services.uuid]}] });
            const device = await request.gatt.connect();
            const BTServices = await device.getPrimaryServices();
            setLoading(false);
            setServices(BTServices);
        } catch {
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