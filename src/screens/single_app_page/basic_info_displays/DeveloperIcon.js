import * as React from 'react';
import {Text, View} from 'react-native';
import {colors} from "../../../global/styles";
import {Ionicons} from "@expo/vector-icons";

export function DeveloperInfo({name}) {
    return (
        <View style={{alignItems: 'center', margin: 5}}>
            <Text style={{fontSize: 15, fontWeight: '600', color: colors.pink}}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
            >Developer</Text>
            <Ionicons name={'person-circle-outline'} size={40} color={'white'}/>
            <Text style={{fontSize: 15, fontWeight: '600', color: colors.aqua}}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
            >{name}</Text>
        </View>
    );
}