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


    useEffect(() => {

        headerApps.length = 0;
        RShift.api.top({type: 'free'}).then(apps => {
            console.log(apps)
            setFreeApps(apps);
        });


        RShift.api.top({type: 'paid'}).then(apps => {
            setPaidApps(apps);
        });

        RShift.api.top({type: 'new'}).then(apps => {

            const results = {
                title: 'Newest Apps',
                results: apps
            }
            headerApps.push(results);
        })

        const getGenre = (genreID) => {
            RShift.api.top({type: 'free', genre: RShift.api.genres[genreID]}).then(apps => {
                const result = {
                    title: RShift.api.genres[genreID],
                    results: apps
                }
                headerApps.push(result);
                if (!RShift.api.genres[genreID + 2]) {
                    forceUpdate();
                } else getGenre(genreID + 2);
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
