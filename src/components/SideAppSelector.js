import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types'
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {viewApp} from "../global/redux/actions/AppListActions";

/**
 * A component to display apps in a horizontal list
 * @param app the app to display
 * @returns {JSX.Element}
 * @constructor
 */

export function SideAppSelector({app}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={{borderRadius: 10, width: Dimensions.get('window').width - 40, padding: 5}}
                          onPress={() => {
                              dispatch(viewApp(app.trackId));
                              navigation.navigate('Single App');
                          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: app.artworkUrl512}} style={{width: 50, height: 50, borderRadius: 10}}/>
                <Text adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{
                          fontSize: 30,
                          color: 'white',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          flex: 1,
                          marginLeft: 5
                      }}>
                    {app.trackCensoredName}
                </Text>
            </View>

            <View style={{height: 2, width: '105%', backgroundColor: 'white'}}/>
        </TouchableOpacity>
    )
}

SideAppSelector.propTypes = {
    app: PropTypes.object,
}
