export const REPORT_ID = 0x00;

export const Devices = {
  AK351_V3_MAX: 'AK351_V3_MAX',
  AK870_MAX: 'AK870_MAX',
} as const;

export const VENDOR_IDS = {
  [Devices.AK351_V3_MAX]: 0x0C45,
  [Devices.AK870_MAX]: 1452,
};

export const PRODUCT_IDS = {
  [Devices.AK351_V3_MAX]: 0x8009,
  [Devices.AK870_MAX]: 591,
};

export type Devices = typeof Devices[keyof typeof Devices]