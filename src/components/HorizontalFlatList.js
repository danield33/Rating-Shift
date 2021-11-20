import * as React from 'react';
import {FlatList} from 'react-native';



export function HorizontalFlatList({items, renderItem, numColums, listStyle, keyID, ...props}) {


    return (
            <FlatList
                {...props}
                key={keyID}
                contentContainerStyle={{alignSelf: 'flex-start'}}
                style={{borderRadius: 10, flexGrow: 0, ...listStyle}}
                data={items}
                numColumns={numColums}
                pagingEnabled={true}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
    );
};