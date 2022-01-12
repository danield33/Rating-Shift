import * as React from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const renderApp = (item) => {

    const url = item.item.artworkUrl512;

    return(
        <View style={{width: Dimensions.get('window').width-40, alignSelf: 'center'}}>
            <Image source={{uri: url}}
                   style={{
                       width: Dimensions.get('window').width,
                       height: 250,
                       resizeMode: 'cover',
                       borderRadius: 20
                   }}/>
        </View>
    )

}

/**
 * A large display of an app icon. The first app in the apps list is the icon to be displayed
 * @param apps a list of apps that should be shown in this category
 * @param title a string the title above this icon
 * @returns {JSX.Element}
 * @constructor
 */

export function LargeAppDisplay({apps, title}) {

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
