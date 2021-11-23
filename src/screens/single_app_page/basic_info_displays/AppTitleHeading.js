import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from "../../../global/styles";

export function AppTitleHeading({name, subtitle, imageURL}) {

    return (
        <View style={{flexDirection: 'row', padding: 10}}>
            <Image source={{uri: imageURL}} style={{width: 150, height: 150, borderRadius: 30}}/>
            <View style={{marginLeft: 10, padding: 10, flex: 1}}>
                <Text style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: '600'
                }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                >{name}</Text>
                <Text style={{
                    color: colors.aqua,
                    fontSize: 20
                }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={2}
                >{subtitle}</Text>
            </View>
        </View>
    );
}