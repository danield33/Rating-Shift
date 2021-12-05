import * as React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {Styles} from "../../global";
import {CustomStarRating} from "../../components/CustomStarRating";
import colors from "../../global/styles/colors";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AppsList from "../apps_list";
import {AppInList} from "../apps_list/AppInList";
import {useForceUpdate} from "../../hooks/useForceUpdate";
import {useFocusEffect} from "@react-navigation/native";

export function Ratings() {

    const user = useSelector(state => state.account.currentUser);
    const [sortedApps, setSorted] = useState(Object.entries(user.activity.ratings));
    const [starCount, setStarCount] = useState(0);
    const update = useForceUpdate();
    const [isRefreshing, setRefreshing] = useState(false);

    const changeStarCount = (count) => {
        setStarCount(count);
    }

    const renderRating = (item) => {
        const rating = item.item;
        if(rating[1] > starCount && starCount !== 0) return null;

        return <AppInList appID={rating[0]}>
            <CustomStarRating rating={rating[1]} isDisabled={true}
                              starStyle={{marginLeft: 5}}
                              containerStyle={{justifyContent: undefined}}
            />
        </AppInList>
    }

    useEffect(() => {
        const highestToLow = Object.entries(user.activity.ratings)
            .sort(([,a],[,b]) => b-a);
        setSorted(highestToLow);
    }, []);

    return (
        <View style={Styles.background}>

            <View style={{
                alignItems: 'center',
                width: '100%',
                borderBottomWidth: 2,
                paddingBottom: 10,
                borderColor: colors.dark_blue
            }}>
                <CustomStarRating isDisabled={false} starSize={35}
                                  containerStyle={{justifyContent: 'center'}}
                                  setRating={changeStarCount}
                />
                <Button style={{position: 'absolute', right: 5}}
                        title={'Reset'}
                        onPress={() => setStarCount(0)}
                        color={colors.light_blue}/>
                <Text style={{fontSize: 20, color: colors.aqua}}>Filter by Stars</Text>
            </View>

            <FlatList data={sortedApps}
                      style={{width: '100%'}}
                      keyExtractor={i => i[0]}
                      renderItem={renderRating}/>

        </View>
    );
};