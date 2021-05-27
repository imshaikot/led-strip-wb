import * as React from 'react';
import { useContext, useState } from 'react';
import { Spinner, Card, Button } from 'react-bootstrap';
import { ON, OFF, STATIC_COLOR } from "../buffer.json";
import AppContext from '../app.context';
import { ColorPicker, useColor } from "react-color-palette";

const toBuffer = (bytes: string[]) => new Uint8Array(bytes.map(byte => Number(byte)));

const Connected = () => {
    const { 
        uuid,
        services, 
        writableCharacteristic,
    } = useContext(AppContext);

    const [color, setColor] = useColor("hex", "#121212");

    const onSwitchOn = async () => {
        await writableCharacteristic.writeValueWithoutResponse(toBuffer(ON));
    }

    const onSwitchOff = async () => {
        await writableCharacteristic.writeValueWithoutResponse(toBuffer(OFF));
    }

    console.log(color)

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
                <Button className="space-md" onClick={onSwitchOn} variant="primary" size="lg">
                    ON
                </Button>
                <Button  className="space-md" onClick={onSwitchOff} variant="danger" size="lg">
                    OFF
                </Button>
                <ColorPicker width={200} color={color} onChange={onColorChange} hideRGB hideHEX />
            </div>
        </Card>
    )
}

export default Connected;