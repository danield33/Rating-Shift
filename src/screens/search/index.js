import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import {Styles} from "../../global";
import colors from "../../global/styles/colors";
import {TextInputValue} from "../../components/TextInputValue";
import {useImperativeHandle, useRef, useEffect, useState} from "react";
import EventSource from "react-native-sse";
import {AppsList} from "../index";
import {SearchBar} from "./SearchBar";
import {If} from "../../components/If";
import {SearchedApp} from "./SearchedApp";

export default function SearchPage() {

    const [searchedItems, setSearchedItems] = useState([])

    const search = (text) => {

        setSearchedItems(undefined)
        fetch('http://localhost:3000/api?'+ new URLSearchParams({
            text: text,
            allImages: false
        })).then(async res => {
                const items = await res.json();
                setSearchedItems(items);
            });
        fetch('http://localhost:3000/api?'+ new URLSearchParams({
            text: text,
            allImages: true
        })).then(async res => {
            const items = await res.json();
            setSearchedItems(items);
        });
    }

    const renderApp = (item) => {
        const app = item.item;
        return <SearchedApp app={app}/>
    }

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