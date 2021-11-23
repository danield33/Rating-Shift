import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from "react-redux";
import {viewApp} from "../../global/redux/actions/AppListActions";
import {useNavigation} from "@react-navigation/native";
import {Line} from "../../components/Line";
import colors from "../../global/styles/colors";

export function AppInList({app}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                dispatch(viewApp(app));
                navigation.navigate('Single App');
            }}>
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

            <Line style={{width: '100%'}}/>
        </TouchableOpacity>
    );
}