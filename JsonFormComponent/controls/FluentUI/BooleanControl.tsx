import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ControlDefinition } from '../../types';
import { generateRandomID } from '../../common';

export interface IBooleanControlProps {
  controlDefinition: ControlDefinition,
  value: boolean;
  onChange: (fieldName: string, newValue: boolean) => void
}

export const BooleanControl: React.FunctionComponent<IBooleanControlProps> = (props) => {
  return (
    <Stack
      horizontal
      horizontalAlign='center'
      id={props.controlDefinition.name + '-' + generateRandomID()}
      style={{ margin: 5 }}
    >
      <StackItem>
        <Toggle
          id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
          label={props.controlDefinition.label}
          checked={props.value}
          onChange={(ev, _checked) => { if (_checked != undefined) props.onChange(props.controlDefinition.name, _checked) }}
        />
      </StackItem>
    </Stack>
  )
}