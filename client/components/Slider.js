import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    SliderContainer,
    SliderInput,
    SliderValueText,
} from '../styledComponents/SliderStyle';

import {
    setPreferenceValue,
    updatePreferenceValue,
    fetchUserPreferences,
} from '../store/preference';

const Slider = (props) => {
    const dispatch = useDispatch();

    const [value, setValue] = useState(props.value);

    const handleOnChange = (evt) => {
        evt.preventDefault();
        const newValue = evt.target.value;

        setValue(newValue);
        dispatch(
            updatePreferenceValue({
                prefVale: parseInt(newValue),
                prefId: props.pref_id,
            })
        );
        dispatch(fetchUserPreferences());
    };

    return (
        <>
            <SliderContainer>
                <SliderValueText>{value}</SliderValueText>
                <SliderInput
                    type="range"
                    min={0}
                    max={5}
                    value={value}
                    className="slider"
                    onChange={handleOnChange}
                ></SliderInput>
            </SliderContainer>
        </>
    );
};

export default Slider;
