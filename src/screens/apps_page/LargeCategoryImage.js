import * as React from 'react';
import {Image, Text, View} from 'react-native';

export function LargeCategoryImage({appList, width}) {
    const item = appList.item.results[0];
    const url = item.artworkUrl512;

    return (

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


    );
};