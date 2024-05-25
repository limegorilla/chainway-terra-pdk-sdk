import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ChainwayTerraPdkSdkViewProps } from './ChainwayTerraPdkSdk.types';

const NativeView: React.ComponentType<ChainwayTerraPdkSdkViewProps> =
  requireNativeViewManager('ChainwayTerraPdkSdk');

export default function ChainwayTerraPdkSdkView(props: ChainwayTerraPdkSdkViewProps) {
  return <NativeView {...props} />;
}
