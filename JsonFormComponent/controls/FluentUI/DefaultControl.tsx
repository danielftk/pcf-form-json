import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition, FormValue } from '../../types';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';

export interface IDefaultControlProps {
    controlDefinition: ControlDefinition,
    value: FormValue
}

export const DefaultControl: React.FunctionComponent<IDefaultControlProps> = (props) => {
    return (
        <Stack horizontal horizontalAlign='center'>
            <StackItem>
                <TextField
                    id={'insurgo-' + props.controlDefinition.name.toLowerCase()}
                    label={props.controlDefinition.label}
                    value={props.value[props.controlDefinition.name] as string}
                    type={'number'}
                />
            </StackItem>
        </Stack>
    )
}