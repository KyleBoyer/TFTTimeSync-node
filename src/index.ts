import { updateLightingMode, updateTime } from "./device";
import { LightingModes } from "./light-modes";

const main = async () => {
    await updateTime();
    await updateLightingMode(LightingModes.Glittering);
}
main();