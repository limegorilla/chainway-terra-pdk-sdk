import { EventEmitter, Subscription } from "expo-modules-core";

// Import the native module. On web, it will be resolved to ChainwayTerraPdkSdk.web.ts
// and on native platforms to ChainwayTerraPdkSdk.ts
import {
  BarcodeScannedEventPayload,
  ChangeEventPayload,
} from "./ChainwayTerraPdkSdk.types";
import ChainwayTerraPdkSdkModule from "./ChainwayTerraPdkSdkModule";

export async function scanBarcode(): Promise<void> {
  return await ChainwayTerraPdkSdkModule.scanBarcode();
}

export function prepareScanner(): Promise<void> {
  return ChainwayTerraPdkSdkModule.prepareScanner();
}

export function isPhysicalScanner(): () => void {
  return ChainwayTerraPdkSdkModule.isPhysicalScanner();
}

export function isScannerReady(): () => boolean {
  return ChainwayTerraPdkSdkModule.isScannerReady();
}

const emitter = new EventEmitter(ChainwayTerraPdkSdkModule);

export function addBarcodeScannedListener(
  listener: (event: BarcodeScannedEventPayload) => void,
): Subscription {
  return emitter.addListener("eventBarcodeScanSuccess", listener);
}

export function addBarcodeScanFailListener(
  listener: (event: BarcodeScannedEventPayload) => void,
): Subscription {
  return emitter.addListener("eventBarcodeScanFail", listener);
}

export { ChangeEventPayload, BarcodeScannedEventPayload };
