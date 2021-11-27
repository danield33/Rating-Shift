import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {Styles} from "../../global";
import colors from "../../global/styles/colors";
import {SearchBar} from "./SearchBar";
import {If} from "../../components/If";
import {SearchedApp} from "./SearchedApp";

let controller = null;

export default function SearchPage() {

    const [searchedItems, setSearchedItems] = useState([])//undefined = is searching

    const search = (text) => {

        if (controller) controller.abort();

        controller = new AbortController();
        const {signal} = controller;

        const link = __DEV__ ? 'http://localhost:3000/api/search?' : 'https://ratingshiftapi.herokuapp.com/api/search?'

        setSearchedItems(undefined);
        fetch(link + new URLSearchParams({
            text: text,
            allImages: false
        }), {signal}).then(async res => {
            const items = await res.json();
            controller = null;
            setSearchedItems(items);
        });
        fetch(link + new URLSearchParams({
            text: text,
            allImages: true
        }), {signal}).then(async res => {
            const items = await res.json();
            setSearchedItems(items);
        });
    }

    const renderApp = (item) => {
        const app = item.item;
        return <SearchedApp app={app}/>
    }

    useEffect(() => {
        return () => {
            if(controller){
                controller.abort();
                controller = null;
            }
        }
    })

    return (
        <View style={{...Styles.background}}>
            <SearchBar onSearch={search}/>

            <If can={searchedItems === undefined}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} color={colors.red}/>
                    <Text style={{color: colors.aqua, fontSize: 20}}>Loading</Text>
                </View>
                <FlatList data={searchedItems}
                          style={{width: '100%', top: 20}}
                          renderItem={renderApp}
                          keyExtractor={(app, index) => index.toString()}
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                          alwaysBounceHorizontal={false}
                />
            </If>

        </View>
    );
};