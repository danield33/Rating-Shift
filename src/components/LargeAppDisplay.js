import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {HorizontalFlatList} from "./HorizontalFlatList";

const {width} = Dimensions.get('window');
const previewCount = 1;
const itemWidth = width / (previewCount + .5);
const startScroll = (itemWidth * 3 / 4);

export function LargeAppDisplay({apps, renderItem}) {

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
                            renderItem={(item) => renderItem(item, itemWidth)}
        />
    );
}