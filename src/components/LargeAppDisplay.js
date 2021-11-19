import * as React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const renderApp = (appList) => {
    const item = appList.item.results[0]
    const url = item.artworkUrl512;

    return(
        <View style={{flex: 1}}>
            <Text style={{
                fontSize: 30,
                color: 'white'
            }}>{appList.item.title}</Text>
            <View style={{width: Dimensions.get('window').width-40, alignSelf: 'center'}}>
                <Image source={{uri: url}}
                       style={{
                           width: Dimensions.get('window').width,
                           height: 250,
                           resizeMode: 'cover',
                           borderRadius: 20
                       }}/>
            </View>
        </View>

    );

}

export function LargeAppDisplay({apps}) {

    // console.log(apps)
    return (
            <HorizontalFlatList items={apps}
                                key={apps.length}
                                numColums={apps.length}
                                renderItem={renderApp}
            />
    );
};