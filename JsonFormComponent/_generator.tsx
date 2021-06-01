import * as React from 'react';
import { IInputs } from './generated/ManifestTypes';

export interface IGeneratorProps {
  PCFContext: ComponentFramework.Context<IInputs>,
}

export const Generator: React.FunctionComponent<IGeneratorProps> = (props) => {
  return (
    <div></div>
  )
}