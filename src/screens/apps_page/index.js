import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Styles} from "../../global";
import React, {useEffect, useState} from "react";
import RShift from '../../database';
import {LargeAppDisplay} from "../../components/LargeAppDisplay";
import {useForceUpdate} from "../../hooks/useForceUpdate";
import {SliderContainer} from "./SliderContainer";
import colors from "../../global/styles/colors";
import {LargeCategoryImage} from "./LargeCategoryImage";


export default function Apps() {

    const [freeApps, setFreeApps] = useState([]);
    const [paidApps, setPaidApps] = useState([]);
    const [headerApps, setHeaderApps] = useState([]);
    const forceUpdate = useForceUpdate();
    const aborters = [];

    useEffect(() => {

        headerApps.length = 0;
        aborters.length = 0;//for refreshing purposes <^
        const topFreeAborter = RShift.api.top({type: 'free'}, apps => {
            setFreeApps(apps);
        });
        aborters.push(topFreeAborter)

        const paidAborter = RShift.api.top({type: 'paid'}, apps => {
            setPaidApps(apps);
        });
        aborters.push(paidAborter)

        const newAborter = RShift.api.top({type: 'new'}, apps => {

            const results = {
                title: 'Newest Apps',
                results: apps
            }
            headerApps.push(results);
        })
        aborters.push(newAborter)

        const getGenre = (genreID) => {
            const genreTopAborter = RShift.api.top({type: 'free', genre: RShift.api.genres[genreID]}, apps => {
                const result = {
                    title: RShift.api.genres[genreID],
                    results: apps
                }
                headerApps.push(result);
                if (!RShift.api.genres[genreID + 1]) {
                    forceUpdate();
                } else getGenre(genreID + 1);
            })
            aborters.push(genreTopAborter);
        }
        getGenre(6000);

        return () => {
            aborters.forEach(i => i?.abort())
        }

    }, []);


    return (
        <View style={Styles.background}>
            <ScrollView style={{flex: 1}}
                        showsVerticalScrollIndicator={false}>
                {
                    headerApps.length ?
                        <LargeAppDisplay apps={headerApps}
                                         renderItem={(item, size) => <LargeCategoryImage appList={item}
                                                                                         width={size}/>}/>
                        : <ActivityIndicator size={'large'} color={colors.red}/>
                }

                <SliderContainer apps={freeApps} title={'Top Free Apps'}/>
                <SliderContainer apps={paidApps} title={'Top Paid Apps'}/>

            </ScrollView>

        </View>
    );
};