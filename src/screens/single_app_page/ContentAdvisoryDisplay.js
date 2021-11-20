import * as React from 'react';
import {View, Text} from 'react-native';
import colors from "../../global/styles/colors";

export function ContentAdvisoryDisplay({age}) {
    return (
        <View style={{alignItems: 'center'}}>

            <Text style={{fontSize: 15, fontWeight: '600', color: colors.pink}}>Age</Text>
            <Text style={{fontSize: 25, color: 'white', fontWeight: '700', marginTop: 5, marginBottom: 2}}>{age}</Text>
            <Text style={{fontSize: 15, fontWeight: '600', color: colors.aqua}}>Years Old</Text>

        </View>
    );
};