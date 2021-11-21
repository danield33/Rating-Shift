import {ActivityIndicator, Button, ScrollView, Text, View} from 'react-native';
import {Styles} from "../../global";
import {SideAppSelectorList} from "../../components/SideAppSelectorList";
import React, {useEffect, useState} from "react";
import RShift from '../../firebase';
import colors from "../../global/styles/colors";
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {useForceUpdate} from "../../hooks/useForceUpdate";
import {SliderContainer} from "./SliderContainer";

export default function Apps() {

    const [freeApps, setFreeApps] = useState([]);
    const [paidApps, setPaidApps] = useState([]);
    const [headerApps, setHeaderApps] = useState([]);
    const forceUpdate = useForceUpdate();


    useEffect(() => {

        headerApps.length = 0;
        RShift.ftMatters.top({limit: 21, list_name: 'topgrossing'}).then(apps => {
            setPaidApps(apps.app_list);
        });
        RShift.ftMatters.top({limit: 21, list_name: 'topselling_free'}).then(apps => {
            setFreeApps(apps.app_list);
        });

        RShift.ftMatters.query({
            lang: 'en',
            limit: 21
        }, {
            query: {
                query_params: {
                    from: 0,
                    num: 10,
                    sort: 'score',
                    released_after_dynamic: 'last_day'
                }
            }
        }).then(apps => {
            apps.title = 'Newest Apps';
            headerApps.push(apps);
        });


        const getGenre = (genreID) => {
            RShift.ftMatters.getTopGenreApps(genreID).then(apps => {
                apps = JSON.parse(JSON.stringify(apps))//TODO: test remove this when using actual api
                apps.title = RShift.ftMatters.genres[genreID];

                headerApps.push(apps);
                if (!RShift.ftMatters.genres[genreID + 2]) {
                    forceUpdate();
                } else setTimeout(() => getGenre(genreID + 2), 300);
            })
        }
        getGenre(6000);

    }, []);


    return (
        <View style={Styles.background}>
            <ScrollView style={{flex: 1}}
                        showsVerticalScrollIndicator={false}>
                {
                    headerApps.length ?
                        <LargeAppDisplay apps={headerApps}/>
                        : <ActivityIndicator size={'large'}/>
                }

                <SliderContainer apps={freeApps} title={'Top Free Apps'}/>
                <SliderContainer apps={freeApps} title={'Top Paid Apps'}/>

            </ScrollView>

        </View>
    );
};