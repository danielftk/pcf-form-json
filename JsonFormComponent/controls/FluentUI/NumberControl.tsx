import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition } from '../../types';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';
import { generateRandomID } from '../../common';

export interface INumberControlProps {
    controlDefinition: ControlDefinition,
    value: number | undefined
    onChange: (fieldName: string, newValue: number) => void
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };


export const NumberControl: React.FunctionComponent<INumberControlProps> = (props) => {
    let _value = props.value
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
                    defaultValue={_value?.toString()}
                    onChange={(ev, _newValue) => { if (_newValue != undefined) props.onChange(props.controlDefinition.name, Number.parseInt(_newValue)) }}
                    type={'number'}
                />
            </StackItem>
        </Stack>
    )
}