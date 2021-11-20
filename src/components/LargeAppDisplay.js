import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const {width} = Dimensions.get('window');
const previewCount = 1;
const itemWidth = width/(previewCount+.5);
const startScroll = (itemWidth*3/4);

const renderApp = (appList) => {
    const item = appList.item.results[0]
    const url = item.artworkUrl512;

    return (

        <View style={{ margin: 5, alignSelf: 'center', width: itemWidth-10}}>
            <Text style={{
                fontSize: 30,
                color: 'white'
            }}>{appList.item.title}</Text>
            <Image source={{uri: url}}
                   style={{
                       width: itemWidth - 10,
                       height: 250,
                       resizeMode: 'cover',
                       borderRadius: 20,
                       alignSelf: 'center'
                   }}/>
        </View>


    );

}

export function LargeAppDisplay({apps}) {

    const snapToOffset = apps.map((_, i) => {
        return ((i * itemWidth) + startScroll)
    })


    return (
        <HorizontalFlatList items={apps}
                            decelerationRate={0}
                            horizontal={true}
                            snapToOffsets={snapToOffset}
                            snapToAlignment={'center'}
                            key={apps.length}
                            numColums={undefined}
                            renderItem={renderApp}
        />
    );
};