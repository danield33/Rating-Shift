import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from "react-redux";
import {viewApp} from "../../global/redux/actions/AppListActions";
import {useNavigation} from "@react-navigation/native";
import {Line} from "../../components/Line";
import colors from "../../global/styles/colors";
import RShift from '../../database';

export function AppInList({appID, onPressOvewrite, hidden, children}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [app, setApp] = useState(null)

    useEffect(() => {
        const aborter = RShift.apps.get(appID, app => {
            setApp(app)
        });
        return () => {
            aborter.abort()
        }
    }, [])

    if (app != null && hidden?.(app))
        return null;

    return (

        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                if (app?.trackId) {
                    if (onPressOvewrite)
                        return onPressOvewrite(app);
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
                            {children}
                        </View>
                    </View>
                    : <ActivityIndicator color={colors.red} size={'large'}/>

            }


            <Line style={{width: '100%'}}/>
        </TouchableOpacity>
    );
}