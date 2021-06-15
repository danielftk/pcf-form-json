import * as React from 'react';
import { ControlDefinition } from '../../types';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/components/Stack';
import { DatePicker } from '@fluentui/react/lib/components/DatePicker/DatePicker';
import { DayOfWeek } from '@fluentui/date-time-utilities';
import { generateRandomID } from '../../common';

export interface IDatepickerControlProps {
    controlDefinition: ControlDefinition,
    value: Date | undefined
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };

export const DatepickerControl: React.FunctionComponent<IDatepickerControlProps> = (props) => {
    let _value: Date | undefined;
    if (props.value)
        _value = new Date(props.value!);
    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5 }}
            styles={stackStyles}
        >
            <StackItem>
                <DatePicker
                    id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
                    label={props.controlDefinition.label}
                    value={_value}
                    firstDayOfWeek={DayOfWeek.Monday}
                    placeholder="Select a date..."
                    ariaLabel="Select a date" />
            </StackItem>
        </Stack>
    );
}