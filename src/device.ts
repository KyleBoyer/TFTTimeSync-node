import { LightingMode } from "./light-modes";
import { getConfigureLightingModePacket, getConfigureTimePacket, getResetStatePacket, getSavePacket, getUpdateLightingModePacket, getUpdateTimePacket } from "./packets";
import { getFeatureReport, sendFeatureReport } from "./protocol"

export const updateTime = async () => {
    await sendFeatureReport(getResetStatePacket());
    await sendFeatureReport(getConfigureTimePacket());
    await getFeatureReport();
    await sendFeatureReport(getUpdateTimePacket());
    await sendFeatureReport(getSavePacket());
    await getFeatureReport();
}
export const updateLightingMode = async (lightingMode: LightingMode) => {
    await sendFeatureReport(getResetStatePacket());
    await sendFeatureReport(getConfigureLightingModePacket());
    await getFeatureReport();
    await sendFeatureReport(getUpdateLightingModePacket(lightingMode));
    await sendFeatureReport(getSavePacket());
    await getFeatureReport();
};
