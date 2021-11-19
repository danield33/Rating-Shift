import * as React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const renderApp = (item) => {

    console.log(item, 'item')
    return null;
    const url = item.item.artworkUrl512;

    return(
        <View style={{width: Dimensions.get('window').width-40, alignSelf: 'center'}}>
            <Image source={{uri: url}}
                   style={{
                       width: Dimensions.get('window').width-40,
                       height: 250,
                       resizeMode: 'cover',
                       borderRadius: 20
                   }}/>
        </View>
    )

}

export function LargeAppDisplay({apps, title}) {

    // const appKeys = Object.keys(apps);
    console.log(Array.isArray(apps), apps.length, 'isArray')
    return (
        <View>

            <Text style={{
                color: 'white',
                fontSize: 25,
            }}>{title}</Text>
            <HorizontalFlatList items={apps}
                                key={apps.length}
                                numColums={apps.length}
                                renderItem={renderApp}
            />
        </View>
    );
};