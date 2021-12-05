import * as React from 'react';
import {View} from 'react-native';
import {Styles} from "../../global";
import {SearchBar} from "../search/SearchBar";

export function Reviews() {

    const onSearch = (text) => {

    }



    return (
        <View style={Styles.background}>
            <SearchBar onSearch={onSearch}/>
        </View>
    );
};