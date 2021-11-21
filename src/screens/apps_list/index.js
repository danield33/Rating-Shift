import * as React from 'react';
import {View, FlatList} from 'react-native';


const renderApp = (appItem) => {
    console.log(appItem);
}

export default function AppsList({apps}) {
    return (
        <FlatList data={apps}
                  renderItem={renderApp}
                  keyExtractor={(item, index) => index.toString()}
                  
        />
    );
};