import * as React from 'react';
import { useContext, useCallback, useEffect } from 'react';
import { Spinner, Card, Button } from 'react-bootstrap';
import { ON, OFF, STATIC_COLOR } from "../buffer.json";
import AppContext from '../app.context';
import { ColorPicker, useColor } from "react-color-palette";

const toBuffer = (bytes: string[]) => new Uint8Array(bytes.map(byte => Number(byte)));

const Connected = () => {
    const { 
        uuid,
        services,
        request,
        device, 
        writableCharacteristic,
        setConnected,
        setWritableCharacteristic,
    } = useContext(AppContext);

    const [color, setColor] = useColor("hex", "#121212");

    const onSwitchOn = async () => {
        await writableCharacteristic.writeValueWithoutResponse(toBuffer(ON));
    }

    const onSwitchOff = async () => {
        await writableCharacteristic.writeValueWithoutResponse(toBuffer(OFF));
    }

    const disconnect = useCallback(() => {
        request.gatt.disconnect();
    }, [request]);

    const onDisconnect = useCallback(() => {
        setConnected(false);
    }, [request]);

    useEffect(() => {
        request.addEventListener('gattserverdisconnected', onDisconnect);
    }, [request]);

    const onColorChange = async (rColor : any) => {
        const { rgb } = rColor;
        STATIC_COLOR[1] = rgb.r;
        STATIC_COLOR[2] = rgb.g;
        STATIC_COLOR[3] = rgb.b;
        await writableCharacteristic.writeValueWithoutResponse(toBuffer(STATIC_COLOR));
        setColor(rColor);
    }

    return (
        <Card body>
            <div className="ble-vbox">
                <Card.Subtitle style={{ marginTop: 15, marginBottom: 15 }}>
                    Connected Device: <i>{ device.device.name }</i>
                </Card.Subtitle>
                <Button className="space-md" onClick={onSwitchOn} variant="primary" size="lg">
                    ON
                </Button>
                <Button  className="space-md" onClick={onSwitchOff} variant="danger" size="lg">
                    OFF
                </Button>
                <div className="ble-hbox ble-middle">
                    <ColorPicker width={250} color={color} onChange={onColorChange}  hideHEX />
                </div>
                <Button  className="space-md" onClick={disconnect} variant="danger" size="lg">
                    Disconnect
                </Button>
            </div>
        </Card>
    )
}

export default Connected;