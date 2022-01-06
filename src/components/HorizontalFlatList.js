import * as React from 'react';
import {FlatList} from 'react-native';

/**
 * Creates a horizontal list of items while making each page of the list have a certain number of rows
 * @param items an iterable object
 * @param renderItem a function to render each item
 * @param numColums the number of columns needed
 * @param listStyle the style of the list
 * @param keyID an id to update the list
 * @returns {JSX.Element}
 * @constructor
 */
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
}
