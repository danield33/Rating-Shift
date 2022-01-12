import React from 'react';
import Dialog from "react-native-dialog";

/**
 * Displays an input to put text into over the screen
 * @param visible should be rendered
 * @param onBackDropPress when the background is pressed
 * @param title the title of the input
 * @param description the description of the input
 * @param placeholder the placeholder text for the input
 * @param onTextChange when the text content changes
 * @param onSubmit when the submit button is pressed
 * @param onCancel when the cancelled button is pressed
 * @param style the style of the input
 * @returns {JSX.Element}
 * @constructor
 */

export function InputText({
                              visible,
                              onBackDropPress,
                              title,
                              description,
                              placeholder,
                              onTextChange,
                              onSubmit,
                              onCancel,
                              style,
                          }) {
    let text = "";
    const onChangeText = (txt) => {
        text = txt;
        onTextChange?.(txt);
    }

    return (

        <Dialog.Container contentStyle={style} visible={visible} onBackdropPress={onBackDropPress}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
                {description}
            </Dialog.Description>
            <Dialog.Input placeholder={placeholder} onChangeText={onChangeText}/>
            <Dialog.Button label="Cancel" onPress={onCancel}/>
            <Dialog.Button label="Done" onPress={() => onSubmit(text)}/>
        </Dialog.Container>

    )
}
