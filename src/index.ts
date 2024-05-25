import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ChainwayTerraPdkSdk.web.ts
// and on native platforms to ChainwayTerraPdkSdk.ts
import ChainwayTerraPdkSdkModule from './ChainwayTerraPdkSdkModule';
import ChainwayTerraPdkSdkView from './ChainwayTerraPdkSdkView';
import { ChangeEventPayload, ChainwayTerraPdkSdkViewProps } from './ChainwayTerraPdkSdk.types';

// Get the native constant value.
export const PI = ChainwayTerraPdkSdkModule.PI;

export function hello(): string {
  return ChainwayTerraPdkSdkModule.hello();
}

export async function setValueAsync(value: string) {
  return await ChainwayTerraPdkSdkModule.setValueAsync(value);
}

const emitter = new EventEmitter(ChainwayTerraPdkSdkModule ?? NativeModulesProxy.ChainwayTerraPdkSdk);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ChainwayTerraPdkSdkView, ChainwayTerraPdkSdkViewProps, ChangeEventPayload };
