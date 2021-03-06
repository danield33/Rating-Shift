import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {Data, Styles} from "../../global";
import colors from "../../global/styles/colors";
import {SearchBar} from "./SearchBar";
import {If} from "../../components/If";
import {SearchedApp} from "./SearchedApp";

let controller = null;

export default function SearchPage() {

    const [searchedItems, setSearchedItems] = useState([])//undefined = is searching


    const search = (text) => {

        if (controller)
            controller.abort();

        controller = new AbortController();
        const {signal} = controller;

        const link = Data.serverURL+'/api/search?';

        setSearchedItems(undefined);
        //first time quick search
        fetch(link + new URLSearchParams({
            text: text,

            allImages: false
        }), {signal}).then(async res => {
            const items = await res.json();
            setSearchedItems(items);
            if(!items.length){
                Alert.alert("No apps were found. Please try again or try a different search.")
            }
        }).catch(() => {});
        //second time slow search but with more data to load
        fetch(link + new URLSearchParams({
            text: text,
            allImages: true
        }), {signal}).then(async res => {
            const items = await res.json();
            controller = null;
            setSearchedItems(items);
        }).catch(() => {});
    }

    const renderApp = (item) => {
        const app = item.item;
        return <SearchedApp app={app}/>
    }

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
                controller = null;
            }
        }
    }, [])

    return (
        <View style={{...Styles.background}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
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
                </>
            </TouchableWithoutFeedback>
        </View>
    );
};
