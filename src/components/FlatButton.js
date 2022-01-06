import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

/**
 * A standard button to perform an action
 * @param text the text inside the button
 * @param color the color of the button
 * @param onPress a function when the button is pressed
 * @param style the style of the button container
 * @param viewStyle the style of the button view
 * @param textStyle the style of the text
 * @returns {JSX.Element}
 * @constructor
 */
export function FlatButton({text, color = "#f01d71", onPress, style, viewStyle, textStyle}) {

    return (

        <TouchableOpacity onPress={onPress} style={style}>
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
