import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Checkbox, values } from '@fluentui/react';
import { ControlDefinition, OptionSetDefinition } from '../../types';
import { generateRandomID } from '../../common';

export interface ICheckboxControlProps {
    controlDefinition: ControlDefinition,
    metadata: OptionSetDefinition[],
    values: string[],
    onChange: (fieldName: string, newValue: string[]) => void
}

export const CheckboxControl: React.FunctionComponent<ICheckboxControlProps> = (props) => {
    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5 }}
        >
            {
                props.metadata.map((element, index, array) => {
                    let _checked = false;
                    if (props.values)
                        _checked = props.values.findIndex((value: number | string | null) => value === element.value) != -1 ? true : false;
                    return (
                        <StackItem
                            id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
                            style={{ padding: 5, paddingLeft: '5%' }}
                        >
                            <Checkbox
                                id={element.value + '-' + generateRandomID()}
                                label={element.label}
                                checked={_checked}
                                onChange={
                                    () => {
                                        let _newValue = _checked == true ?
                                            props.values.filter((value) => value != element.value)
                                            : [...props.values, element.value.toString()];
                                        props.onChange(
                                            props.controlDefinition.name,
                                            _newValue
                                        )
                                    }
                                }
                            />
                        </StackItem>
                    )
                })
            }

        </Stack>
    )
}