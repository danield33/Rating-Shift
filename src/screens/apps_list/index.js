import * as React from 'react';
import {View, FlatList} from 'react-native';
import {Styles} from "../../global";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

const renderApp = (appItem) => {
    return(
        <View></View>
    )
}

export default function AppsList() {

    const apps = useSelector(state => state.currentApps);

    console.log(apps, 1)

    return (
        <View style={Styles.background}>
            <FlatList data={apps}
                      renderItem={renderApp}
                      keyExtractor={(item, index) => index.toString()}

            />
        </View>
    );
};