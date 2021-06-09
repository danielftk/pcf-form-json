import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ControlDefinition } from '../../types';

export interface IBooleanControlProps {
  controlDefinition: ControlDefinition,
  value: boolean | undefined
}

export const BooleanControl: React.FunctionComponent<IBooleanControlProps> = (props) => {
  let _randomID = Math.random().toString(36).substring(2, 15);
  let _value = props.value! || undefined;
  return (
    <Stack horizontal horizontalAlign='center'>
      <StackItem>
        <Toggle
          id={props.controlDefinition.name.toLowerCase() + '-' + _randomID}
          label={props.controlDefinition.label}
          defaultChecked={_value!}
        />
      </StackItem>
    </Stack>
  )
}