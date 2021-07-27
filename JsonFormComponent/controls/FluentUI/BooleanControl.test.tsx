import * as React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, queryByRole, render } from '@testing-library/react'
import { BooleanControl } from './BooleanControl';
import { ControlDefinition } from '../../types';


describe("BooleanControl Tests", () => {

    let controlDefinition = {
        type: 'boolean',
        label: 'Test Label',
        name: 'test-name',
    } as ControlDefinition
    let updateValueFunction = jest.fn();

    it('Label render correctly', () => {
        const { queryByText, queryByRole } = render(
            <BooleanControl
                controlDefinition={controlDefinition}
                onChange={updateValueFunction}
                value={true}
            />
        )

        let _label = queryByText(controlDefinition.label);
        let _toggle = queryByRole('switch');

        expect(_label).toBeTruthy();
        expect(_label).toHaveProperty('id', 'test-name-booleanField-label');
        expect(_toggle).toBeTruthy();
        expect(_toggle).toHaveProperty('id', 'test-name-booleanField');
    }
    )
    it('Renders correctly: Checked', () => {
        let initialValue = true;

        const { queryByRole } = render(
            <BooleanControl
                controlDefinition={controlDefinition}
                onChange={updateValueFunction}
                value={initialValue}
            />
        )

        let _toggle = queryByRole('switch');

        expect(_toggle).toBeTruthy();
        expect(_toggle).toHaveProperty('id', 'test-name-booleanField');
        expect(_toggle).toBeChecked()
    }
    )
    it('renders correctly: Not Checked', () => {
        let initialValue = false;

        const { queryByRole } = render(
            <BooleanControl
                controlDefinition={controlDefinition}
                onChange={updateValueFunction}
                value={initialValue}
            />
        )

        let _toggle = queryByRole('switch');

        expect(_toggle).toBeTruthy();
        expect(_toggle).toHaveProperty('id', 'test-name-booleanField');
        expect(_toggle).not.toBeChecked()
    }
    )
    it('change value when clicked', () => {
        let initialValue = false;
        const { queryByRole } = render(
            <BooleanControl
                controlDefinition={controlDefinition}
                onChange={updateValueFunction}
                value={initialValue}
            />
        )
        let toggle = queryByRole('switch');
        fireEvent.click(toggle!);
        expect(updateValueFunction).toBeCalledTimes(1);
        expect(updateValueFunction).toBeCalledWith(controlDefinition.name, !initialValue);
    }
    )
})