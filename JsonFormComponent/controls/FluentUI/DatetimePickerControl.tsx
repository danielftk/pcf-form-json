import * as React from 'react';
import { ControlDefinition } from '../../types';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/components/Stack';
import TextField from '@material-ui/core/TextField/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { generateRandomID } from '../../common';

export interface IDatetimepickerControlProps {
    controlDefinition: ControlDefinition,
    value: Date | undefined,
    onChange: (fieldName: string, newValue: Date | string | null | undefined) => void
}
const stackStyles: Partial<IStackStyles> = { root: { display: 'block' } };
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            width: '100%',
        },
    }),
);

export const DatetimepickerControl: React.FunctionComponent<IDatetimepickerControlProps> = (props) => {
    const classes = useStyles();
    let _stringValue = (): string | null => {
        if (props.value) {
            let _DateValue = new Date(props.value);
            if (_DateValue && _DateValue.toISOString() && _DateValue.toLocaleTimeString()) {
                var n = new Date().getTimezoneOffset();
                let _timeString = _DateValue.toLocaleTimeString();
                _DateValue.setMinutes(-1 * n);
                let _dateString = _DateValue.toISOString().substring(0, 11);
                debugger;
                return (_dateString + _timeString);
            }
        }
        return null
    }

    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        try {
            debugger
            let _newValue: Date = new Date((event.target as any).valueAsNumber);
            props.onChange(props.controlDefinition.name, _newValue.toISOString().substring(0, 19));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5 }}
            styles={stackStyles}
        >
            <StackItem>
                <form className={classes.container} noValidate>
                    <TextField
                        id={props.controlDefinition.name.toLowerCase() + '-' + generateRandomID()}
                        label={props.controlDefinition.label}
                        type="datetime-local"
                        defaultValue={_stringValue()}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            _onChange(ev);
                        }}
                    />
                </form>
            </StackItem>
        </Stack>
    );
}