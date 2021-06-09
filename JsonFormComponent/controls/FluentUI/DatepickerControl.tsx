import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ControlDefinition, FormValue } from '../../types';
import { Stack, StackItem } from '@fluentui/react/lib/components/Stack';

export interface IDatepickerControlProps {
    controlDefinition: ControlDefinition,
    value: FormValue
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export const DatepickerControl: React.FunctionComponent<IDatepickerControlProps> = (props) => {
    const classes = useStyles();
    return (
        <Stack horizontal horizontalAlign='center'>
            <StackItem>
                <form className={classes.container} noValidate>
                    <TextField
                        id={'insurgo-' + props.controlDefinition.name.toLowerCase()}
                        label={props.controlDefinition.label}
                        type="datetime-local"
                        defaultValue={props.value[props.controlDefinition.name] as string}
                        className={classes.textField}
                    />
                </form>
            </StackItem>
        </Stack>
    );
}