import { LightingMode } from './light-modes';
// The names of these functions are purely guesses, with the exception of the time/lighting mode packets
export const getResetStatePacket = () => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x18;
    return buf;
}
export const getSavePacket = () => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x02;
    return buf;
}
export const getConfigureTimePacket = () => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x28;
    buf[8] = 0x01
    return buf;
}

export const getConfigureLightingModePacket = () => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x13;
    buf[8] = 0x01;
    return buf;
}

export const getUpdateTimePacket = () => {
    const now = new Date();
    let buf = Buffer.alloc(64);
    buf[0] = 0x00;
    buf[1] = 0x01;
    buf[2] = 0x5a;
    buf[3] = now.getFullYear() - 2000;
    buf[4] = now.getMonth() + 1;
    buf[5] = now.getDate();
    buf[6] = now.getHours();
    buf[7] = now.getMinutes();
    buf[8] = now.getSeconds();
    buf[9] = 0x00;
    buf[10] = 0x04;
    buf[62] = 0xaa;
    buf[63] = 0x55;
    return buf;
}

export const getUpdateLightingModePacket = (lightingMode: LightingMode) => {
    let buf = Buffer.alloc(64);
    buf[0] = lightingMode; // 0x02 // 0x03 (this must be the byte corresponding to light mode)
    buf[1] = 0xff;
    buf[8] = 0x01;
    buf[9] = 0x05;
    buf[10] = 0x03;
    buf[11] = 0x00;
    buf[12] = 0x00;
    buf[13] = 0x00;
    buf[14] = 0xaa;
    buf[15] = 0x55;
    return buf;
}