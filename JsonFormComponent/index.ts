import 'jquery';
import 'popper.js';
import 'bootstrap';

import { IInputs, IOutputs } from './generated/ManifestTypes';
import { Generator } from './generator';
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { GeneratorComponent, IGeneratorProps } from './_Generator';

export class JsonFormComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private _result: string;

  constructor() { }

  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    ReactDOM.render(
      React.createElement(GeneratorComponent,
        {
          PCFContext: context,
          submitValue: (result) => {
            this._result = result;
            this._notifyOutputChanged();
          }

        } as IGeneratorProps),
      this._container
    )
  }

  public getOutputs(): IOutputs {
    return {
      StringProperty: this._result,
    };
  }
  public destroy(): void { }
}
