import { updateLightingMode, updateTime } from "./device";
import { LightingModes } from "./light-modes";
import { sleep } from "./utils";

const demoLightingModes = async (secondsToDemo = 5) => {
    for(const [modeName, modeNumber] of Object.entries(LightingModes)){
        console.log(`Changing to mode: ${modeName}`);
        await updateLightingMode(modeNumber);
        await sleep(secondsToDemo * 1000);
    }
}

const main = async () => {
    await updateTime();
    await updateLightingMode(LightingModes.Launch);
}
main();