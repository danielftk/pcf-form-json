import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { convertToJson } from './common';
import { BooleanControl, IBooleanControlProps } from './controls/FluentUI/BooleanControl';
import { IInputs } from './generated/ManifestTypes';
import { ControlDefinition, FormValue, UiDefinition } from './types';

import * as React from 'react';

export interface IGeneratorProps {
  PCFContext: ComponentFramework.Context<IInputs>,
}

export const FormGenerator: React.FunctionComponent<IGeneratorProps> = (props) => {
  const _parameters = props.PCFContext.parameters
  const _stringProperty = _parameters.StringProperty.raw;
  const _controlFormJson = _parameters.ControlFormJson.raw;
  const _formValues: FormValue = convertToJson<FormValue>(
    _stringProperty
  );
  const _FormDefinition = convertToJson<UiDefinition>(
    _controlFormJson
  );

  return (
    <Stack horizontalAlign="center">
      {_FormDefinition.controls.length > 0 ?
        _FormDefinition.controls.map((controlDefinition) => {
          let _type = controlDefinition.type
          switch (_type) {
            case 'boolean':
              //let props: IBooleanControlProps = {
              //controlDefinition: formValues.find((value) => value.controlProperties == controlDefinition)!,
              //}
              //return (React.createElement(BooleanControl, props))
              //workaround
              break;
            /*
              case 'lookup':
              const currentDefinition = definition.lookupMetadata[control.name];
              controlElement = generateLookup(
                this.context.utils,
                control,
                currentDefinition,
                value as ComponentFramework.EntityReference[]
              );
              break;
            case 'number':
              controlElement = generateNumber(control, value as number);
              break;
            case 'optionset':
              const optionSets = definition.optionSetMetadata[control.name];
              controlElement = generateOptionSet(control, value as number, optionSets);
              break;
            case 'checkbox':
              const metadata = definition.optionSetMetadata[control.name];
              controlElement = generateCheckbox(control, metadata, value as number[] | string[] | null);
              break;
            case 'date':
              controlElement = generateDate(control, value as string);
              break;
            case 'datetime':
              controlElement = generateDateTime(control, value as string);
              break;
            */
            default:

              // controlElement = generateDefault(control, value as string);
              break;
          }

        })
        : null
      }
    </Stack>
  )
}