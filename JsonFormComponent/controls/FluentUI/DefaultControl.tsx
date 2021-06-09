import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition } from '../../types';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';

export interface IDefaultControlProps {
    controlDefinition: ControlDefinition,
    value: string | undefined
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };

export const DefaultControl: React.FunctionComponent<IDefaultControlProps> = (props) => {
    let _randomID = Math.random().toString(36).substring(2, 15);
    let _value = props.value!.toString() || undefined;
    return (
        <Stack horizontal horizontalAlign='center' styles={stackStyles}>
            <StackItem>
                <TextField
                    id={props.controlDefinition.name.toLowerCase() + '-' + _randomID}
                    label={props.controlDefinition.label}
                    defaultValue={_value}
                />
            </StackItem>
        </Stack>
    )
}