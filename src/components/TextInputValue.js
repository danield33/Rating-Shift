import * as React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import {Keyboard, TextInput} from 'react-native';

/**
 * Component to wrap around text inputs to easily access and clear the text content with its reference
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly onTextChange?: *, readonly endEditing?: *, readonly onSetText?: *, readonly blur?: *, readonly textChange?: *, readonly submitEditing?: *}> & React.RefAttributes<unknown>>}
 */
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
        },
        _getText: () => {
            return inputText
        }
    }))

    const onChange = (text) => {
        inputText = text;
        onTextChange?.(inputText);
    }

    const setText = (event) => {
        if (event.nativeEvent.text !== undefined) {
            inputText = event.nativeEvent.text;
            onSetText?.(inputText);
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