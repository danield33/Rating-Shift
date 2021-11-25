import * as React from 'react';
import {FlatList} from 'react-native';
import {View, Image, Text, Dimensions} from 'react-native';
import colors from "../global/styles/colors";
import {HorizontalFlatList} from "./HorizontalFlatList";

const renderAppItem = (item) => {
    const app = item.item;

    return(
        <View style={{ borderRadius: 10, width: Dimensions.get('window').width-40, padding: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: app.icon_url}} style={{width: 50, height: 50, borderRadius: 10}}/>
                <Text adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{fontSize: 30, color: 'white', flexDirection: 'row', flexWrap: 'wrap', flex: 1}} >
                    {app.app_name}
                </Text>
            </View>

            <View style={{height: 2, width: '105%', backgroundColor: 'white'}}/>
        </View>
    )
}

export function SideAppSelector({apps}) {
    return (
        <HorizontalFlatList items={apps}
                            key={apps.length}
                            listStyle={{backgroundColor: colors.red}}
                            renderItem={renderAppItem}
                            numColums={Math.ceil(apps.length/3)}/>
    );
};
