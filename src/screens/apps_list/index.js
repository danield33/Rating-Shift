import * as React from 'react';
import {FlatList, View} from 'react-native';
import {Styles} from "../../global";
import {useSelector} from "react-redux";
import {AppInList} from "./AppInList";

const renderApp = (appItem) => {
    const trackId = appItem.item;
    return <AppInList appID={trackId}/>
}

export default function AppsList() {

    const apps = useSelector(state => {
        return state.appList.currentApps
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