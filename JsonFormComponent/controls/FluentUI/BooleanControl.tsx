import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ControlDefinition, FormValue } from '../../types';

export interface IBooleanControlProps {
  controlDefinition: ControlDefinition,
  value: FormValue
}

export const BooleanControl: React.FunctionComponent<IBooleanControlProps> = (props) => {
  return (
    <Stack horizontal horizontalAlign='center'>
      <StackItem>
        <Toggle
          id={'insurgo-' + props.controlDefinition.name.toLowerCase()}
          label={props.controlDefinition.label}
          checked={props.value[props.controlDefinition.name] as boolean}
        />
      </StackItem>
    </Stack>
  )
}