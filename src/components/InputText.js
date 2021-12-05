
import React from 'react';
import Dialog from "react-native-dialog";

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