import { updateLightingMode, updateTime } from "./device";
import { LightingMode, LightingModeName, LightingModes } from "./light-modes";
import { setDebugLogsEnabled, setUSBProcessingTimeMS } from "./settings";
import { sleep } from "./utils";
import { InvalidOptionArgumentError, program } from "commander";
import { Devices } from "./constants";

const demoLightingModes = async (secondsToDemo = 5, deviceType: Devices) => {
    for(const [modeName, modeNumber] of Object.entries(LightingModes)){
        console.log(`Changing to mode: ${modeName}`);
        await updateLightingMode(modeNumber, deviceType);
        await sleep(secondsToDemo * 1000);
    }
}

const lightingModeParse = (val: string) => {
    for(const [modeName, modeNumber] of Object.entries(LightingModes)){
        if(modeName.toLowerCase() == val.toLowerCase() || val == modeNumber.toString()){
            return modeName;
        }
    }
    throw new InvalidOptionArgumentError("Invalid lighting mode name/number provided!");
}

const deviceTypeParse = (type: string) => {
    for (const deviceName of Object.values(Devices)) {
        if (deviceName.toLowerCase() == type.toLowerCase()) {
            return Devices[deviceName];
        }
    }

    throw new InvalidOptionArgumentError("Invalid device type provided!");
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
    device: Devices,
}
type MainOptions = GlobalOptions & {
    lightingMode: LightingModeName
}
program.name("Keyboard CLI Tool")
    .option('-d, --device <device>', 'Type of device', deviceTypeParse, Devices.AK351_V3_MAX)
    .option('-l, --lighting-mode <lighting-mode>', 'Number or name choice of lighting mode', lightingModeParse, "Launch")
    .option('--usb-delay <delay>', 'Delay, in milliseconds, between USB control commands', intParse, 40)
    .option('--debug', 'Show debug logs', false)
    .action(async ({ device, usbDelay, debug, lightingMode }: MainOptions) => {
        setUSBProcessingTimeMS(usbDelay);
        setDebugLogsEnabled(debug);
        console.log('Updating time...');
        await updateTime(device);
        const lightingModeNumber: LightingMode = LightingModes[lightingMode];
        console.log(`Setting lighting mode to "${lightingMode}"...`);
        await updateLightingMode(lightingModeNumber, device);
        console.log('Done!');
    });

type DemoOptions = GlobalOptions & {
    time: number
}
program.command('demo')
    .description("Demo the lighting modes")
    .option('-d, --device <device-type>', 'Type of device', deviceTypeParse, Devices.AK351_V3_MAX)
    .option('-t, --time <seconds>', 'Number of seconds to display the lighting mode', intParse, 5)
    .option('--usb-delay <delay>', 'Delay, in milliseconds, between USB control commands', intParse, 40)
    .option('--debug', 'Show debug logs', false)
    .action(async ({ device, usbDelay, debug, time }: DemoOptions) => {
        setUSBProcessingTimeMS(usbDelay);
        setDebugLogsEnabled(debug);
        console.log(`Cycling lighting modes every ${time} seconds...`);
        await demoLightingModes(time, device);
        console.log('Done!');
    });

program.parse(process.argv);
