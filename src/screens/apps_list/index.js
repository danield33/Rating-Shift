import * as React from 'react';
import {View, FlatList} from 'react-native';
import {Styles} from "../../global";
import {useSelector} from "react-redux";
import {SideAppSelector} from "../../components/SideAppSelector";

const renderApp = (appItem) => {
    const app = appItem.item;
    return <SideAppSelector app={app}/>
}

export default function AppsList() {

    const apps = useSelector(state => state.currentApps);

    return (
        <View style={Styles.background}>
            <FlatList data={apps}
                      renderItem={renderApp}
                      keyExtractor={(item, index) => index.toString()}

            />
        </View>
    );
};