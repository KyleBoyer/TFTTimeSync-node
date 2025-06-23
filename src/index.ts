import { updateLightingMode, updateTime } from "./device";
import { LightingMode, LightingModeName, LightingModes } from "./light-modes";
import { setDebugLogsEnabled, setUSBProcessingTimeMS } from "./settings";
import { sleep } from "./utils";

const demoLightingModes = async (secondsToDemo = 5) => {
    for(const [modeName, modeNumber] of Object.entries(LightingModes)){
        console.log(`Changing to mode: ${modeName}`);
        await updateLightingMode(modeNumber);
        await sleep(secondsToDemo * 1000);
    }
}

import { InvalidOptionArgumentError, program } from "commander";

const lightingModeParse = (val: string) => {
    for(const [modeName, modeNumber] of Object.entries(LightingModes)){
        if(modeName.toLowerCase() == val.toLowerCase() || val == modeNumber.toString()){
            return modeName;
        }
    }
    throw new InvalidOptionArgumentError("Invalid lighting mode name/number provided!");
}

const intParse = (val: string) => {
    const num = parseInt(val);
    if(isNaN(num) || num < 1){
        throw new InvalidOptionArgumentError("Invalid number provided!");
    }
    return num;
}

type GlobalOptions = {
    debug: boolean,
    usbDelay: number,
}
type MainOptions = GlobalOptions & {
    lightingMode: LightingModeName
}
program.name("Keyboard CLI Tool")
    .option('-l, --lighting-mode <lighting-mode>', 'Number or name choice of lighting mode', lightingModeParse, "Launch")
    .option('--usb-delay <delay>', 'Delay, in milliseconds, between USB control commands', intParse, 40)
    .option('--debug', 'Show debug logs', false)
    .action(async ({ usbDelay, debug, lightingMode }: MainOptions) => {
        setUSBProcessingTimeMS(usbDelay);
        setDebugLogsEnabled(debug);
        console.log('Updating time...');
        await updateTime();
        const lightingModeNumber: LightingMode = LightingModes[lightingMode];
        console.log(`Setting lighting mode to "${lightingMode}"...`);
        await updateLightingMode(lightingModeNumber);
        console.log('Done!');
    });

type DemoOptions = GlobalOptions & {
    time: number
}
program.command('demo')
    .description("Demo the lighting modes")
    .option('-t, --time <seconds>', 'Number of seconds to display the lighting mode', intParse, 5)
    .option('--usb-delay <delay>', 'Delay, in milliseconds, between USB control commands', intParse, 40)
    .option('--debug', 'Show debug logs', false)
    .action(async ({  usbDelay, debug, time }: DemoOptions) => {
        setUSBProcessingTimeMS(usbDelay);
        setDebugLogsEnabled(debug);
        console.log(`Cycling lighting modes every ${time} seconds...`);
        await demoLightingModes(time)
        console.log('Done!');
    });

program.parse(process.argv);