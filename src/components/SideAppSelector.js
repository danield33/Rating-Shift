import React, {use} from 'react';
import {Dimensions, Image, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";

export function SideAppSelector({app}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{borderRadius: 10, width: Dimensions.get('window').width - 40, padding: 5}}
                          onPress={() => navigation.navigate('Single App', {
                              params: {app: app}
                          })}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: app.artworkUrl512}} style={{width: 50, height: 50, borderRadius: 10}}/>
                <Text adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{fontSize: 30, color: 'white', flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                    {app.trackCensoredName}
                </Text>
            </View>

            <View style={{height: 2, width: '105%', backgroundColor: 'white'}}/>
        </TouchableOpacity>
    )
};

SideAppSelector.propTypes = {
    app: PropTypes.object,
}