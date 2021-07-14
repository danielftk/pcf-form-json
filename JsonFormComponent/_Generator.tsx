import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { convertToJson, generateRandomID } from './common';
import { IInputs } from './generated/ManifestTypes';
import { FormValue, UiDefinition } from './types';
import { BooleanControl, IBooleanControlProps } from './controls/FluentUI/BooleanControl';
import { ILookupControlProps, LookupControl } from './controls/FluentUI/LookupControl';
import { INumberControlProps, NumberControl } from './controls/FluentUI/NumberControl';
import { IOptionsetControlProps, OptionsetControl } from './controls/FluentUI/OptionsetControl';
import { CheckboxControl, ICheckboxControlProps } from './controls/FluentUI/CheckboxControl';
import { DatepickerControl, IDatepickerControlProps } from './controls/FluentUI/DatepickerControl';
import { DatetimepickerControl, IDatetimepickerControlProps } from './controls/FluentUI/DatetimePickerControl';
import { DefaultControl, IDefaultControlProps } from './controls/FluentUI/DefaultControl';

export interface IGeneratorProps {
    PCFContext: ComponentFramework.Context<IInputs>,
    submitValue: (newValue: any) => void
}

export const GeneratorComponent: React.FunctionComponent<IGeneratorProps> = (props) => {
    let _JSONFormDefinition = props.PCFContext.parameters.ControlFormJson.raw
    const _formDefinition = convertToJson<UiDefinition>(
        _JSONFormDefinition
    );
    if (!_JSONFormDefinition) return (
        <div style={{ color: 'red' }}>
            <h2><b>Error</b></h2>
        </div>
    );

    const _JSONFormValues = props.PCFContext.parameters.StringProperty.raw;
    const [initialFormValues, setinitialFormValues] = React.useState(convertToJson<FormValue>(
        _JSONFormValues
    ))

    const obj = {} as FormValue;

    obj["key"] = "whatever";

    const _onChangeValue = (fieldName: string, newValue: any) => {
        console.log(initialFormValues)
        let _newState = initialFormValues;
        _newState[fieldName] = newValue;
        setinitialFormValues(_newState);
        props.submitValue(JSON.stringify(initialFormValues));
        console.log(initialFormValues)
    }

    return (
        <Stack
            id={'formGenerator' + '-' + generateRandomID()}
        >
            {
                _formDefinition.controls.map((control) => {
                    const value = initialFormValues[control.name];
                    let controlElement;
                    switch (control.type) {
                        case 'boolean':
                            controlElement = React.createElement(
                                BooleanControl,
                                {
                                    controlDefinition: control,
                                    value: value as boolean,
                                    onChange: _onChangeValue
                                } as IBooleanControlProps
                            )
                            break;
                        case 'lookup':
                            controlElement = React.createElement(
                                LookupControl,
                                {
                                    controlDefinition: control,
                                    value: value as ComponentFramework.EntityReference[],
                                    lookupDefinition: _formDefinition.lookupMetadata[control.name],
                                    utils: props.PCFContext.utils,
                                    onChange: _onChangeValue
                                } as ILookupControlProps
                            )
                            break;
                        case 'number':
                            controlElement = React.createElement(
                                NumberControl,
                                {
                                    controlDefinition: control,
                                    value: value as number,
                                    onChange: _onChangeValue
                                } as INumberControlProps
                            )

                            break;
                        case 'optionset':
                            var _optionSet = _formDefinition.optionSetMetadata[control.name];

                            controlElement = React.createElement(
                                OptionsetControl,
                                {
                                    controlDefinition: control,
                                    value: value as number,
                                    options: _optionSet,
                                    onChange: _onChangeValue
                                } as IOptionsetControlProps
                            )
                            break;
                        case 'checkbox':
                            const _metadata = _formDefinition.optionSetMetadata[control.name];
                            controlElement = React.createElement(
                                CheckboxControl,
                                {
                                    controlDefinition: control,
                                    metadata: _metadata,
                                    values: value as number[] | string[] | null,
                                    onChange: _onChangeValue
                                } as ICheckboxControlProps
                            )
                            break;
                        case 'date':
                            controlElement = React.createElement(
                                DatepickerControl,
                                {
                                    controlDefinition: control,
                                    value: value as Date,
                                    onChange: _onChangeValue
                                } as IDatepickerControlProps
                            )
                            break;
                        case 'datetime':
                            controlElement = React.createElement(
                                DatetimepickerControl,
                                {
                                    controlDefinition: control,
                                    value: value as Date,
                                    onChange: _onChangeValue
                                } as IDatetimepickerControlProps
                            )
                            break;
                        default:
                            controlElement = React.createElement(
                                DefaultControl,
                                {
                                    controlDefinition: control,
                                    value: value as string,
                                    onChange: _onChangeValue
                                } as IDefaultControlProps
                            )
                            break;
                    }
                    return controlElement
                }
                )}
        </Stack >
    )
}