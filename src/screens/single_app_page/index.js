import * as React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {colors, Styles} from '../../global/styles'
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";

export default function SingleApp({app}) {

    const navigation = useNavigation();
    const appData = app ?? navigation.getState().routes[1].params.params.app;
    const image = appData.artworkUrl512

    return (
        <SafeAreaView style={Styles.background}>
            <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
                <Image source={{uri: image}} style={{width: 150, height: 150, borderRadius: 30}}/>
                <View style={{marginLeft: 10, padding: 10, flex: 1}}>
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: '600'
                    }}
                          adjustsFontSizeToFit={true}
                          numberOfLines={2}
                    >{appData.trackCensoredName}</Text>
                    <Text style={{
                        color: colors.aqua,
                        fontSize: 20
                    }}
                          adjustsFontSizeToFit={true}
                          numberOfLines={2}
                    >{appData.subtitle}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};


SingleApp.propTypes = {
    app: PropTypes.object,
}
