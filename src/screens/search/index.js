import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Styles} from "../../global";
import colors from "../../global/styles/colors";
import {TextInputValue} from "../../components/TextInputValue";
import {useImperativeHandle, useRef, useEffect, useState} from "react";
import EventSource from "react-native-sse";
import {AppsList} from "../index";
import {SearchBar} from "./SearchBar";

export default function SearchPage() {

    const [searchedItems, setSearchedItems] = useState([])

    const search = (text) => {

        setSearchedItems(undefined)
        fetch('http://localhost:3000/api?text='+text)
            .then(async res => {
                const items = await res.json();
                setSearchedItems(items);
            });
    }

    useEffect(() => {

    })

    return (
        <View style={{...Styles.background}}>
            <SearchBar onSearch={search}/>



        </View>
    );
};