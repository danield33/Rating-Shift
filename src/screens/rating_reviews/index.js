import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Styles} from "../../global";
import {ReviewHeader} from "./ReviewHeader";
import {Line} from "../../components/Line";
import {ReviewCard} from "./ReviewCard";
import {useSelector} from "react-redux";
import RShift from '../../database'
import colors from "../../global/styles/colors";

export default function RatingsPage({allExpanded, showHeader = true}) {
    const trackId = useSelector(state => state.appList.currentlyViewing.item);
    const [app, setApp] = useState(null);

    useEffect(() => {
        const aborter = RShift.apps.get(trackId, app => {
            setApp(app);
        })
        return () => {
            aborter.abort()

        }
    }, [])


    const renderItem = (item) => {
        const review = item.item;
        return <ReviewCard review={review} canExpand={true} defaultExpanded={allExpanded}/>
    }

    return (
        <View style={Styles.background}>
            {app != null ? <>
                {showHeader ? (
                        <>
                            <View style={{width: '100%'}}>
                                <ReviewHeader hideButton={true}/>
                            </View>
                            <Line style={{marginBottom: 0}}/>
                        </>
                    )
                    : null

                }

                <FlatList data={app.reviews}
                          style={{width: '100%', flex: 1}}
                          keyExtractor={(item, index) => index.toString()}
                          showsVerticalScrollIndicator={false}
                          renderItem={renderItem}
                />
            </> : <ActivityIndicator size={'large'} color={colors.red}/>

            }

        </View>
    );
};