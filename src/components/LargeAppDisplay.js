import * as React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const renderApp = (appList) => {
    const item = appList.item.results[2]
    const url = item.artworkUrl512;

    return(
        <>
            <View style={{width: Dimensions.get('window').width-40, alignSelf: 'center'}}>
                <Text style={{
                    fontSize: 30,
                    color: 'white'
                }}>{appList.item.title}</Text>
                <Image source={{uri: url}}
                       style={{
                           width: Dimensions.get('window').width-40,
                           height: 250,
                           resizeMode: 'cover',
                           borderRadius: 20,
                           alignSelf: 'center'
                       }}/>
            </View>
        </>

    );

}

export function LargeAppDisplay({apps}) {

    return (
            <HorizontalFlatList items={apps}
                                key={apps.length}
                                numColums={apps.length}
                                renderItem={renderApp}
            />
    );
};