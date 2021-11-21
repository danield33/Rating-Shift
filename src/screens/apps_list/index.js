import * as React from 'react';
import {View, FlatList} from 'react-native';
import {Styles} from "../../global";
import {useNavigation} from "@react-navigation/native";

const renderApp = (appItem) => {
    console.log(appItem);
}

export default function AppsList({apps}) {

    const navigation = useNavigation();
    console.log(navigation.getState())

    return (
        <View style={Styles.background}>
            <FlatList data={apps}
                      renderItem={renderApp}
                      keyExtractor={(item, index) => index.toString()}

            />
        </View>
    );
};