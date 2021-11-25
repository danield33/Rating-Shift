import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export function FlatButton({text, color = "#f01d71", onPress, style, viewStyle, textStyle, copilot}) {

    return (

        <TouchableOpacity onPress={onPress} style={style} {...copilot}>
            <View style={[styles.button, {backgroundColor: color}, viewStyle]}>
                <Text style={[styles.buttonText, textStyle]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }

})