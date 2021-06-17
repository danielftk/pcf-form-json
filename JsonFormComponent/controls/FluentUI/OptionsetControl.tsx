import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition, OptionSetDefinition } from '../../types';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import { generateRandomID } from '../../common';

export interface IOptionsetControlProps {
    controlDefinition: ControlDefinition,
    value: number | string,
    options: OptionSetDefinition[],
    onChange: (fieldName: string, newValue: number | string) => void
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };


export const OptionsetControl: React.FunctionComponent<IOptionsetControlProps> = (props) => {
    let _value = props.value;
    const _options: IDropdownOption[] = [];
    props.options.map((element) => {
        _options.push({
            id: element.label + generateRandomID(),
            key: element.value,
            text: element.label,
        })
    })
    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5 }}
            styles={stackStyles}
        >
            <StackItem>
                <Dropdown
                    id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
                    placeholder="Select an option"
                    label={props.controlDefinition.label}
                    selectedKey={_value}
                    options={_options}
                    onChange={(ev, _selectedOption) => {
                        props.onChange(
                            props.controlDefinition.name,
                            _selectedOption?.key!
                        )
                    }}
                />
            </StackItem>
        </Stack>
    )
}