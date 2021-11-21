import * as React from 'react';
import {View, FlatList} from 'react-native';
import {Styles} from "../../global";
import {connect} from 'react-redux';
import {useNavigation} from "@react-navigation/native";

const renderApp = (appItem) => {
    console.log(appItem);
}

function AppsList({...props}) {

    // const navigation = useNavigation();

    console.log(props, 1)
    return null;
    return (
        <View style={Styles.background}>
            <FlatList data={currentApps}
                      renderItem={renderApp}
                      keyExtractor={(item, index) => index.toString()}

            />
        </View>
    );
};

const mapStateToProps = (state) => {
    const {currentApps} = state;
    return {currentApps};
}

export default connect(mapStateToProps)(AppsList);