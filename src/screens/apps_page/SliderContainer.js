import * as React from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import colors from "../../global/styles/colors";
import {SideAppSelectorList} from "../../components/SideAppSelectorList";
import {useNavigation} from "@react-navigation/native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {setApps} from "../../global/redux/actions/AppsListActions";


function SliderContainer({apps, title, setApps, appList}) {
    const navigation = useNavigation();

    console.log(appList, 'appList', 1)
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    padding: 3
                }}>{title}</Text>
                <TouchableOpacity onPress={() => {
                    setApps(apps);
                    navigation.navigate("AppsList");
                }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: colors.pink}}>See All</Text>
                </TouchableOpacity>
            </View>
            <SideAppSelectorList apps={apps}/>
        </View>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    const {currentApps} = state;
    return {currentApps};
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setApps,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SliderContainer);