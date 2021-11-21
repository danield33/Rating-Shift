import * as React from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import colors from "../../global/styles/colors";
import {SideAppSelectorList} from "../../components/SideAppSelectorList";

export function SliderContainer({apps, title}) {
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    padding: 3
                }}>{title}</Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: '700', color: colors.pink}}>See All</Text>
                </TouchableOpacity>
            </View>
            <SideAppSelectorList apps={apps}/>
        </View>
    )
}