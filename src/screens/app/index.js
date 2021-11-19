import {View, Text, Button, ScrollView} from 'react-native';
import {Styles} from "../../global";
import {SideAppSelector} from "../../components/SideAppSelectorList";
import React, {useEffect, useState} from "react";
import RShift from '../../firebase';
import colors from "../../global/styles/colors";
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import IOSCategories from "../../firebase/42Matters/IOSCategories";
// import * as aso from 'aso';
import googleplay from 'google-play-scraper'

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
    const [categoryApps, setCategories] = useState([]);


    useEffect(() => {

        // const gplay = require('aso')('gplay');
        // const itunes = require('aso')('itunes');
        //aso('gplay').scores('panda').then(console.log)

// do stuff with google play
//         gplay.scores('panda').then(console.log);

// do stuff with itunes
        //itunes.scores('panda').then(console.log);
        // gplay.app({appId: 'com.google.android.apps.translate'})
        //     .then(console.log, console.log);

        return;
        RShift.ftMatters.top({limit: 21, list_name: 'topgrossing'}).then(apps => {
            console.log(apps);

            // setPaidApps(apps.app_list);
        })
        RShift.ftMatters.top({limit: 21, list_name: 'topselling_free'}).then(apps => {
            // setFreeApps(apps.app_list);
        })

        const getCategoryApps = (categoryID) => {
            RShift.ftMatters.query({
                lang: 'en',
                limit: 1
            }, {
                query:{
                    query_params:{
                        from: 0,
                        num: 10,
                        sort: 'score',
                        primaryGenreId: categoryID
                        // released_after_dynamic: 'last_day' 1637258881169 1637258881577
                    }
                }
            }).then(apps => {
                setTimeout(() => {//need to wait because of rate-limit
                    return;
                    apps.category = categoryID;
                    if(!apps?.results) return;
                    categoryApps.push(apps);
                    getCategoryApps(categoryID+2)
                }, 251)
            });

        }
        getCategoryApps(6000);
        setCategories(categoryApps);


    }, []);

    console.log(freeApps.length, paidApps.length, categoryApps.length, 'arrayLengths')

    return (
        <View style={Styles.background}>
            <ScrollView style={{flex: 1}}>
                <LargeAppDisplay apps={categoryApps} title={'Newest Apps'}/>
                {sliderContainer(freeApps, 'Top Free Apps')}
                {sliderContainer(paidApps, 'Top Paid Apps')}
            </ScrollView>

        </View>
    );
};