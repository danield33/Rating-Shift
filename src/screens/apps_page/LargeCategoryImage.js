import * as React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {setApps} from "../../global/redux/actions/AppListActions";

export function LargeCategoryImage({appList, width}) {
    const item = appList.item.results[0];
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const url = item?.artworkUrl512;

    if (!url) return null;
    const onPress = () => {
        dispatch(setApps(appList.item.results));
        navigation.navigate('AppsList')
    }

    return (

        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{margin: 5, alignSelf: 'center', width: width - 10}}>
                <Text style={{
                    fontSize: 30,
                    color: 'white'
                }}>{appList.item.title}</Text>
                <Image source={{uri: url}}
                       style={{
                           width: width - 10,
                           height: 250,
                           resizeMode: 'cover',
                           borderRadius: 20,
                           alignSelf: 'center'
                       }}/>
            </View>
        </TouchableWithoutFeedback>


    );
}