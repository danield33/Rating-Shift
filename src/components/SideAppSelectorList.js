import * as React from 'react';
import {FlatList} from 'react-native';
import {View, Image, Text, Dimensions} from 'react-native';
import colors from "../global/styles/colors";

const renderAppItem = (item) => {
    const app = item.item;

    return(
        <View style={{ borderRadius: 10, width: Dimensions.get('window').width-40, padding: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: app.artworkUrl512}} style={{width: 50, height: 50, borderRadius: 10}}/>
                <Text adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{fontSize: 30, color: 'white', flexDirection: 'row', flexWrap: 'wrap', flex: 1}} >
                    {app.trackCensoredName}
                </Text>
            </View>

            <View style={{height: 2, width: '100%', backgroundColor: 'white'}}/>
        </View>
    )
}

export function SideAppSelector({apps}) {
    return (
        <FlatList
            contentContainerStyle={{alignSelf: 'flex-start'}}
            style={{borderRadius: 10, backgroundColor: colors.red, flexGrow: 0}}
            key={apps.length}
            data={apps}
            numColumns={Math.ceil(apps.length/3)}
            pagingEnabled={true}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderAppItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};
