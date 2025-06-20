import * as HID from 'node-hid';
// Your keyboard's USB vendor/product IDs
const VENDOR_ID = 0x0C45;
const PRODUCT_ID = 0x8009;

const getDevice = () => {
    const devices = HID.devices(VENDOR_ID, PRODUCT_ID);
    if (!devices.length) {
        throw new Error("Device not found!");
    }
    const deviceInfo = devices.find(d => d.usage == 1 && d.usagePage == 65299 && d.interface == 3) as HID.Device;
    if(!deviceInfo?.path){
      throw new Error('Device has no connection path!')
    }
    return new HID.HID(deviceInfo.path)
}

const appendReportIDToFeatureReportBuffer = (buf: Buffer) => {
  const newBuff = Buffer.alloc(buf.length + 1);
  newBuff[0] = 0x00;
  buf.copy(newBuff, 1, 0, buf.length);
  return newBuff;
}

const sendPacket1 = (device: HID.HID) => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x18;
    device.sendFeatureReport(appendReportIDToFeatureReportBuffer(buf));
    device.getFeatureReport(0x00, 65);
}
const sendPacket2 = (device: HID.HID) => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x28;
    buf[8] = 0x01
    device.sendFeatureReport(appendReportIDToFeatureReportBuffer(buf));
    device.getFeatureReport(0x00, 65);
}
const sendPacket3 = (device: HID.HID) => {
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
    
    device.sendFeatureReport(appendReportIDToFeatureReportBuffer(buf));
    device.getFeatureReport(0x00, 65);
}
const sendPacket4 = (device: HID.HID) => {
    let buf = Buffer.alloc(64);
    buf[0] = 0x04;
    buf[1] = 0x02;
    
    device.sendFeatureReport(appendReportIDToFeatureReportBuffer(buf));
    device.getFeatureReport(0x00, 65);
}

const main = () => {
    const device = getDevice();
    console.log(`Found device! Updating time...`);
    sendPacket1(device);
    sendPacket2(device);
    sendPacket3(device);
    sendPacket4(device);
};

main();
