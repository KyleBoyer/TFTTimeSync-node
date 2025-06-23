const settings = {
    debugLogs: false,
    usbProcessingTimeMS: 40,
}

export const getUSBProcessingTimeMS = () => {
    return settings.usbProcessingTimeMS;
}
export const setUSBProcessingTimeMS = (ms: number) => {
    settings.usbProcessingTimeMS = ms;
}

export const debugLogsEnabled = () => {
    return settings.debugLogs;
}
export const setDebugLogsEnabled = (enabled: boolean) => {
    settings.debugLogs = enabled;
}