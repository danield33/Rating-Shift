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

    const [freeApps, setFreeApps] = useState([]);
    const [paidApps, setPaidApps] = useState([]);
    const [newestApps, setNewest] = useState([]);


    useEffect(() => {
        RShift.ftMatters.top({limit: 21, list_name: 'topgrossing'}).then(apps => {
            console.log(apps)
            // setPaidApps(apps.app_list);
        })
        return;
        RShift.ftMatters.top().then(apps => {
            setFreeApps(apps.app_list);
        })

        RShift.ftMatters.query({
            lang: 'en',
            limit: 21
        }, {
            query:{
                query_params:{
                    from: 0,
                    num: 10,
                    sort: 'score',
                    released_after_dynamic: 'last_day'
                }
            }
        }).then(apps => {
            setNewest(apps.results);
        })

    }, []);


    return (
        <View style={Styles.background}>
            <ScrollView style={{flex: 1}}>
                <LargeAppDisplay apps={newestApps} title={'Newest Apps'}/>
                {/*{sliderContainer(freeApps, 'Top Free Apps')}*/}
                {/*{sliderContainer(paidApps, 'Top Paid Apps')}*/}
            </ScrollView>

        </View>
    );
};
