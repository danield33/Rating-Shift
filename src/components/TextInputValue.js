import * as React from 'react';
import {TextInput} from 'react-native';

export function TextInputValue({endEditing, submitEditing, blur, textChange, onTextChange, onSetText, ...props}) {

    let inputText = "";

    const onChange = (text) => {
        inputText = text;
        onTextChange(inputText);
    }

    const setText = (event) => {
        if (event.nativeEvent.text !== undefined) {
            inputText = event.nativeEvent.text;
            onSetText(inputText);
        }
    }

    return (
        <TextInput {...props}
                   onChangeText={textChange && onChange}
                   onEndEditing={endEditing && setText}
                   onSubmitEditing={submitEditing && setText}
                   onBlur={blur && setText}/>
    );
}