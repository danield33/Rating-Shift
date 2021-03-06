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

        headerApps.length = 0;//remove content without removing reference
        aborters.length = 0;
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

        getGenre(6000);

        return () => {
            aborters.forEach(i => i?.abort())
        }

    }, []);

    /**
     * recursively gets genres from the genre id list
     * @param genreID the starting id of the genres. This must exist in the genre list
     */
    const getGenre = (genreID) => {
        const genreTopAborter = RShift.api.top({type: 'free', genre: RShift.api.genres[genreID]}, apps => {
            const result = {
                title: RShift.api.genres[genreID],
                results: apps
            }
            headerApps.push(result);
            if(genreID  % 3 === 0)
                setHeaderApps([...headerApps]);
            if (RShift.api.genres[genreID + 1])
                getGenre(genreID + 1);
            else forceUpdate();
        })
        aborters.push(genreTopAborter);
    }


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
