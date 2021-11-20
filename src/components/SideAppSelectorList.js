import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import colors from "../global/styles/colors";
import {HorizontalFlatList} from "./HorizontalFlatList";
import {SideAppSelector} from "./SideAppSelector";

const renderAppItem = (item) => {
    const app = item.item;
    return <SideAppSelector app={app}/>
}

export function SideAppSelectorList({apps}) {
    return (
        <HorizontalFlatList items={apps}
                            key={apps.length}
                            listStyle={{backgroundColor: colors.red}}
                            renderItem={renderAppItem}
                            numColums={Math.ceil(apps.length / 3)}/>
    );
}
