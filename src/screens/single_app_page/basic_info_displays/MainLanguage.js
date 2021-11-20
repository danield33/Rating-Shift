import * as React from 'react';
import {Text, View} from 'react-native';
import {colors} from "../../../global/styles";

export function MainLanguageDisp({mainLanguage, additionalLanguagesSize}) {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{color: colors.pink, fontSize: 15, fontWeight: '600'}}>Language</Text>
            <Text style={{
                color: 'white',
                fontSize: 25,
                fontWeight: '700',
                marginTop: 6,
                marginBottom: 6
            }}>{mainLanguage.toUpperCase()}</Text>
            <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: colors.aqua
                }}>+{additionalLanguagesSize} More</Text>
        </View>
    );
};