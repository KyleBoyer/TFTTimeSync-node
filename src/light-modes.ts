
export const LightingModes = {
    'OFF': 0x00,
    'Static': 0x01,
    'SingleOn': 0x02,
    'SingleOff': 0x03,
    'Glittering': 0x04,
    'Falling': 0x05,
    'Colourful': 0x06,
    'Breath': 0x07,
    'Spectrum': 0x08,
    'Outward': 0x09,
    'Scrolling': 0x0a,
    'Rolling': 0x0b,
    'Rotating': 0x0c,
    'Explode': 0x0d,
    'Launch': 0x0e,
    'Ripples': 0x0f,
    'Flowing': 0x10,
    'Pulsating': 0x11,
    'Tilt': 0x12,
    'Shuttle': 0x13,
} as const;

export type LightingMode = typeof LightingModes[keyof typeof LightingModes]