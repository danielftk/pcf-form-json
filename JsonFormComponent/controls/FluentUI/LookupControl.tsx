import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { ControlDefinition } from '../../types';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { generateRandomID } from '../../common';
import Chip from "@material-ui/core/Chip";
initializeIcons();

export interface ILookupControlProps {
    controlDefinition: ControlDefinition,
    lookupDefinition: ComponentFramework.UtilityApi.LookupOptions,
    value: ComponentFramework.EntityReference[]
    utils: ComponentFramework.Utility,
    onChange: (fieldName: string, newValue: ComponentFramework.EntityReference[]) => void
}
interface ChipData {
    key: number;
    label: string;
}

export const LookupControl: React.FunctionComponent<ILookupControlProps> = (props) => {
    let _value = "";
    let _records = props.value;
    if (_records) {
        _records.map(
            (element, index, array) => {
                array.length - 1 > index ? _value += element.name + ", " : _value += element.name
            }
        )
    }
    const _iconProps = { iconName: 'Search' };

    const _onLookupSearch = (
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
            }).then(
                (value: ComponentFramework.EntityReference[]) => {
                    successFn(value);
                },
                (error) => console.error(error)
            );
    }

    return (
        <Stack
            horizontal
            horizontalAlign='center'
            id={props.controlDefinition.name + '-' + generateRandomID()}
            style={{ margin: 5, borderWidth: 1, borderStyle: 'solid', borderColor: 'black' }}
        >
            <span style={{ width: '90%', minHeight: 32, minWidth: 250 }}>
                {props.value?.map((element, index, array) => {
                    return (
                        <span title={element.name.toString() + ' - ' + (element as any).entityType}>
                            <Chip
                                label={element.name.toString()}
                                color={(element as any).entityType == 'contact' ? "primary" : "secondary"}
                                style={{ margin: 1 }}
                                onDelete={() => {
                                    props.onChange(
                                        props.controlDefinition.name
                                        , array.filter((element, _index) => _index != index)
                                    );
                                }}
                            />
                        </span>
                    )
                })}

            </span>
            <span style={{ width: '5%', minWidth: 32 }} >
                <IconButton
                    id={props.controlDefinition.name.toLowerCase() + 'Icon-' + generateRandomID()}
                    iconProps={_iconProps}
                    title="Search"
                    ariaLabel="Search"
                    onClick={
                        () => {
                            _onLookupSearch(
                                props.utils,
                                props.lookupDefinition,
                                (result: ComponentFramework.EntityReference[]): void => {
                                    if (result.length > 0) {
                                        props.onChange(
                                            props.controlDefinition.name,
                                            [..._records, ...result]
                                        )
                                    }
                                }
                            )
                        }
                    }
                    style={{ height: '100%', width: '100%' }}
                />
            </span>
        </Stack>
    )
}