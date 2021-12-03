import * as React from 'react';
import {Image, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {useDispatch} from "react-redux";
import {viewApp} from "../../global/redux/actions/AppListActions";
import {useNavigation} from "@react-navigation/native";
import {Line} from "../../components/Line";
import colors from "../../global/styles/colors";
import {useEffect, useState} from "react";
import RShift from '../../database';

export function AppInList({appID}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [app, setApp] = useState(null)

    useEffect(() => {
        RShift.apps.get(appID).then(app => {
            setApp(app)
        })
    }, [])

    return (
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                if(app.trackId){
                    dispatch(viewApp(app.trackId));
                    navigation.navigate('Single App');
                }
            }}>
            {
                app != null ?
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: app.artworkUrl512}}
                               style={{
                                   width: 75,
                                   height: 75,
                                   borderRadius: 10
                               }}/>
                        <View style={{marginLeft: 10}}>

                            <Text style={{
                                color: colors.aqua,
                                fontSize: 15,
                                fontWeight: '600'
                            }}>{app.trackCensoredName}</Text>

                            <Text style={{color: 'white'}}>{app.subtitle}</Text>
                        </View>
                    </View>
                    :  <ActivityIndicator color={colors.red} size={'large'}/>

            }


            <Line style={{width: '100%'}}/>
        </TouchableOpacity>
    );
}