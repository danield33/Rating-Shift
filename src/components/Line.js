import * as React from 'react';
import {View} from 'react-native';
import {colors} from "../global/styles";

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
};