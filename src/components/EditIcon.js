import * as React from 'react';
import {View} from 'react-native';
import colors from "../global/styles/colors";
import {Ionicons} from "@expo/vector-icons";

export function EditIcon({style, size=25}) {
    return (
        <View style={{
            backgroundColor: colors.light_blue,
            position:'absolute',
            right: 20,
            top: 30,
            borderRadius: 25,
            zIndex: 5,
            borderWidth: 2,
            borderColor: colors.pink,
            ...style
        }}>
            <Ionicons name={'pencil'} size={size} color={colors.dark_blue}
                      style={{padding: 5}}
            />
        </View>
    );
};