import * as React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import {Keyboard, TextInput} from 'react-native';

const TextInputValue = forwardRef(({
                                       endEditing,
                                       submitEditing,
                                       blur,
                                       textChange,
                                       onTextChange,
                                       onSetText,
                                       ...props
                                   }, ref) => {

    let inputText = "";
    const inpRef = useRef(null);

    useImperativeHandle(ref, () => ({
        _clear: () => {
            Keyboard.dismiss()
            inputText = "";
            inpRef.current.clear();
        }
    }))

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
                   ref={inpRef}
                   onEndEditing={endEditing && setText}
                   onSubmitEditing={submitEditing && setText}
                   onBlur={blur && setText}/>
    );
});

export {TextInputValue}