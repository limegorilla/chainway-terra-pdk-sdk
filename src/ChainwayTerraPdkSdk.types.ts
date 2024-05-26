export type ChangeEventPayload = {
  value: string;
};

/**
 * This is the payload received from the native layer when a barcode is scanned.
 * This will record times when a barcode is scanned, but parsing worked, as well as otherwise.
 */
export type BarcodeScannedEventPayload = {
  barcodeData: string; // The actual parsed barcode data
  resultCode: number; // Got a 1 during testing
  prefix: any | null; // Think you can set this with a setting.
  aimId: string | null; // Unsure
  errCode: number; // By the looks of it, 0 is a success
  barcodeBytesData: any; // Came up as "__expo_dynamic_extension__#0" during testing. Unsure.
  barcodeName: string; // Name of barcode type by the looks of things - could be useful! Maybe worth changing to enum?
  barcodeSymbology: number; // Not sure? Came up as a 7 during testing
  decodeTime: number; // Think this is in milliseconds
}

// Unsuccessful barcode scan:
// {"aimId": null, "barcodeBytesData": null, "barcodeData": null, "barcodeName": null, "barcodeSymbology": -1, "decodeTime": 3121, "errCode": 0, "prefix": null, "resultCode": 0}

// Successful barcode scan:
// {"aimId": null, "barcodeBytesData": "__expo_dynamic_extension__#0", "barcodeData": "4056489815785", "barcodeName": "EAN13", "barcodeSymbology": 7, "decodeTime": 231, "errCode": 0, "prefix": null, "resultCode": 1}