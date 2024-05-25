import * as React from 'react';

import { ChainwayTerraPdkSdkViewProps } from './ChainwayTerraPdkSdk.types';

export default function ChainwayTerraPdkSdkView(props: ChainwayTerraPdkSdkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
