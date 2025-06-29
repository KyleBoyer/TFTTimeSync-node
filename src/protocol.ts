import * as HID from 'node-hid';
import { debugLogsEnabled, getUSBProcessingTimeMS } from './settings';
import { padLeft, sleep } from './utils';
import { VENDOR_ID, PRODUCT_ID, REPORT_ID } from './constants';

const devices = HID.devices(VENDOR_ID, PRODUCT_ID);
if (!devices.length) {
    throw new Error("Device not found!");
}
const deviceInfo = devices.find(d => d.usage == 1 && d.usagePage == 65299 && d.interface == 3) as HID.Device;
if(!deviceInfo?.path){
    throw new Error('Device has no connection path!')
}
const device = new HID.HID(deviceInfo.path);

const appendReportIDToFeatureReportBuffer = (buf: Buffer) => {
  const newBuff = Buffer.alloc(buf.length + 1);
  newBuff[0] = REPORT_ID;
  buf.copy(newBuff, 1, 0, buf.length);
  return newBuff;
}

export const sendFeatureReport = async (report: Buffer) => {
    if(debugLogsEnabled()){
        const hexArr = [...report].map(n => padLeft(n.toString(16)));
        console.debug(`Sending feature report:`, hexArr.join(' '))
    }
    const reportWithReportID = appendReportIDToFeatureReportBuffer(report);
    device.sendFeatureReport(reportWithReportID);
    await sleep(getUSBProcessingTimeMS())
}

export const getFeatureReport = async () => {
    const report = device.getFeatureReport(REPORT_ID, 65);
    if(debugLogsEnabled()){
        const hexArr = [...report].map(n => padLeft(n.toString(16)));
        console.debug(`Retrieved feature report:`, hexArr.join(' '))
    }
    await sleep(getUSBProcessingTimeMS());
    return report;
}
