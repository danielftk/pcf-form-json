import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition, FormValue } from '../../types';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';
import { generateRandomID } from '../../common';

export interface IDefaultControlProps {
    controlDefinition: ControlDefinition,
    value: string | undefined,
    onChange: (fieldName: string, newValue: any) => void
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };

export const DefaultControl: React.FunctionComponent<IDefaultControlProps> = (props) => {
    let _value = props.value?.toString();
    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5 }}
            styles={stackStyles}
        >
            <StackItem>
                <TextField
                    id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
                    label={props.controlDefinition.label}
                    defaultValue={_value}
                    onChange={(ev, newValue) => props.onChange(props.controlDefinition.name, newValue)}
                />
            </StackItem>
        </Stack>
    )
}