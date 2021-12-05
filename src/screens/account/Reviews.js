import * as React from 'react';
import {FlatList, View} from 'react-native';
import {Styles} from "../../global";
import {SearchBar} from "../search/SearchBar";
import {Line} from "../../components/Line";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CustomModal} from "../../components/CustomModal";
import {AppInList} from "../apps_list/AppInList";

export function Reviews() {

    const user = useSelector(state => state.account.currentUser);
    const [apps, setApps] = useState(Object.keys(user.activity.reviews))

    const onSearch = (text) => {

    }

    const renderApp = (item) => {
        const app = item.item;
        return <AppInList appID={app}/>
    }

    useEffect(() => {
        const reviews = user.activity.reviews;

    },[])

    return (
        <View style={Styles.background}>

            {/*<CustomModal>*/}

            {/*</CustomModal>*/}

            <SearchBar onSearch={onSearch}/>
            <Line/>
            <FlatList data={apps}
                      renderItem={renderApp}
                      keyExtractor={i => i}
                      style={{width: '100%'}}
            />
        </View>
    );
};