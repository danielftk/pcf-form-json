import * as React from 'react';
import { IStackStyles, Stack, StackItem } from '@fluentui/react/lib/Stack';
import { ControlDefinition } from '../../types';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
initializeIcons();

export interface ILookupControlProps {
    controlDefinition: ControlDefinition,
    lookupDefinition: ComponentFramework.UtilityApi.LookupOptions,
    value: ComponentFramework.EntityReference[]
    utils: ComponentFramework.Utility,
}

export const LookupControl: React.FunctionComponent<ILookupControlProps> = (props) => {
    let _randomID = Math.random().toString(36).substring(2, 15);
    let _value = "";
    props.value.map((element, index) => { props.value.length - 1 > index ? _value += element.name + ", " : _value += element.name })
    const _iconProps = { iconName: 'Search' };

    const onLookupSearch = (
        utils: ComponentFramework.Utility,
        definition: ComponentFramework.UtilityApi.LookupOptions,
        successFn: (result: ComponentFramework.EntityReference[]) => void
    ) => {
        utils
            .lookupObjects({
                allowMultiSelect: definition.allowMultiSelect,
                defaultEntityType: definition.defaultEntityType,
                defaultViewId: definition.defaultViewId,
                entityTypes: definition.entityTypes,
                viewIds: definition.viewIds,
            })
            .then(
                (value: ComponentFramework.EntityReference[]) => {
                    successFn(value);
                },
                (error) => console.error(error)
            );
    }
    return (
        <Stack horizontal>
            <span style={{ width: '90%' }}>
                <TextField
                    id={props.controlDefinition.name.toLowerCase() + '-' + _randomID}
                    label={props.controlDefinition.label}
                    value={_value}
                    multiline={props.value.length > 2 ? true : false}
                    autoAdjustHeight
                    resizable={false}
                />
            </span>
            <span style={{ width: '10%', position: 'relative' }} >
                <IconButton
                    iconProps={_iconProps}
                    title="Search"
                    ariaLabel="Search"
                    style={{ position: 'absolute', bottom: props.value.length > 2 ? '25%' : 0, left: 0 }}
                    onClick={() => { }}
                />
            </span>
        </Stack>
    )
}