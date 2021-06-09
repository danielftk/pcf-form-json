import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition, OptionSetDefinition } from '../../types';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';

export interface IOptionsetControlProps {
    controlDefinition: ControlDefinition,
    value: number | string,
    options: OptionSetDefinition[]
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };


export const OptionsetControl: React.FunctionComponent<IOptionsetControlProps> = (props) => {
    let _randomID = Math.random().toString(36).substring(2, 15);
    let _value = props.value;
    const _options: IDropdownOption[] = [];
    props.options.map((element) => {
        _options.push({
            id: element.label + _randomID,
            key: element.value,
            text: element.label,
        })
    })
    console.log(_value)
    return (
        <Stack horizontal horizontalAlign='center' styles={stackStyles}>
            <StackItem>
                <Dropdown
                    id={_randomID}
                    placeholder="Select an option"
                    label={props.controlDefinition.label}
                    defaultSelectedKey={_value}
                    options={_options}
                />
            </StackItem>
        </Stack>
    )
}