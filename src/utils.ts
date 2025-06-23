export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const padLeft = (toPad: string, desiredLength = 2, padding = "0") => {
    const paddingRequired = desiredLength - toPad.length;
    return padding.repeat(paddingRequired) + toPad;
}
