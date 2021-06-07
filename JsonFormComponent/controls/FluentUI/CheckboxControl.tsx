import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Checkbox } from '@fluentui/react';
import { ControlDefinition, FormValue } from '../../types';

export interface ICheckboxControlProps {
    controlDefinition: ControlDefinition,
    value: FormValue
}

export const CheckboxControl: React.FunctionComponent<ICheckboxControlProps> = (props) => {
    return (
        <Stack horizontal horizontalAlign='center'>
            <StackItem>
                <Checkbox
                    id={'insurgo-' + props.controlDefinition.name.toLowerCase()}
                    label={props.controlDefinition.label}
                    checked={props.value[props.controlDefinition.name] as boolean}
                />
            </StackItem>
        </Stack>
    )
}