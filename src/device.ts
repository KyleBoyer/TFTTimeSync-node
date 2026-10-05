import { LightingMode } from "./light-modes";
import { getConfigureLightingModePacket, getConfigureTimePacket, getResetStatePacket, getSavePacket, getUpdateLightingModePacket, getUpdateTimePacket } from "./packets";
import { getDevices, getFeatureReport, sendFeatureReport } from "./protocol";
import { Devices } from "./constants";

export const updateTime = async (type: Devices) => {
    getDevices(type);
    await sendFeatureReport(getResetStatePacket());
    await sendFeatureReport(getConfigureTimePacket());
    await getFeatureReport();
    await sendFeatureReport(getUpdateTimePacket());
    await sendFeatureReport(getSavePacket());
    await getFeatureReport();
}
export const updateLightingMode = async (lightingMode: LightingMode, type: Devices) => {
    getDevices(type);
    await sendFeatureReport(getResetStatePacket());
    await sendFeatureReport(getConfigureLightingModePacket());
    await getFeatureReport();
    await sendFeatureReport(getUpdateLightingModePacket(lightingMode));
    await sendFeatureReport(getSavePacket());
    await getFeatureReport();
};
