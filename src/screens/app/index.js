import {View, Text, Button, ScrollView} from 'react-native';
import {Styles} from "../../global";
import {SideAppSelector} from "../../components/SideAppSelectorList";
import React, {useEffect, useState} from "react";
import RShift from '../../firebase';
import colors from "../../global/styles/colors";
import {LargeAppDisplay} from "../../components/LargeAppDisplay";

const sliderContainer = (apps, title) => {
    return(
        <View style={{}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    padding: 3
                }}>{title}</Text>
                <Button title={'See All'} color={colors.pink}/>
            </View>
            <SideAppSelector apps={apps}/>
        </View>
    )
}

export default function Apps() {

    const [topApps, setTopApps] = useState([]);
    const [paidApps, setPaidApps] = useState([]);
    const [newestApps, setNewest] = useState([]);


    useEffect(() => {
        RShift.appMonsta.top({limit: 3}).then(apps => {
            setTopApps(apps);
            // setPaidApps(apps.app_list);
        })

    }, []);


    return (
        <View style={Styles.background}>
            <ScrollView style={{flex: 1}}>
                {/*<LargeAppDisplay apps={newestApps} title={'Newest Apps'}/>*/}
                {sliderContainer(topApps, 'Top Apps')}
                {/*{sliderContainer(paidApps, 'Top Paid Apps')}*/}
            </ScrollView>

        </View>
    );
};
