import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from "../../global/styles/colors";
import {SideAppSelectorList} from "../../components/SideAppSelectorList";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setApps} from "../../global/redux/actions/AppListActions";

export function SliderContainer({apps, title}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPress = () => {
        dispatch(setApps(apps));
        navigation.navigate('AppsList');
    }

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    padding: 3
                }}>{title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: colors.pink}}>See All</Text>
                </TouchableOpacity>
            </View>
            <SideAppSelectorList apps={apps}/>
        </View>
    )
}