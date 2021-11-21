import * as React from 'react';
import {View, FlatList} from 'react-native';
import {Styles} from "../../global";
import {useSelector} from "react-redux";
import {AppInList} from "./AppInList";

const renderApp = (appItem) => {
    const app = appItem.item;
    return <AppInList app={app}/>
}

export default function AppsList() {

    const apps = useSelector(state => {
        return state.currentApps
    });

    return (
        <View style={Styles.background}>
            <FlatList data={apps}
                      indicatorStyle={'white'}
                      style={{flex: 1, width: '100%'}}
                      renderItem={renderApp}
                      keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};