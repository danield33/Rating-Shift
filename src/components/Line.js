import * as React from 'react';
import {View} from 'react-native';
import {colors} from "../global/styles";

/**
 * A convenience component to not have the border of a touchable opacity change the opacity of its border
 * @param style a view style
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
