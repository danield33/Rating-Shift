import * as React from 'react';
import {View} from 'react-native';
import {colors} from "../global/styles";

/**
 * Line instead of border width because of touchable opacity opacity changes
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
export function Line({style}) {
    return (
        <View
            style={{
                width: '100%',
                height: 2,
                backgroundColor: colors.dark_blue,
                marginTop: 10,
                marginBottom: 10,
                ...style,

            }}/>
    )
}