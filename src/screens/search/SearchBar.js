import * as React from 'react';
import {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from "../../global/styles/colors";
import {TextInputValue} from "../../components/TextInputValue";

export function SearchBar({onSearch}) {
    let inpRef = useRef(null);

    const clearInput = () => {
        inpRef.current._clear();
    }

    return (
        <View style={{justifyContent: 'flex-start', width: '100%'}}>
            <Text style={{fontSize: 35, color: colors.aqua, fontWeight: 'bold'}}>Search</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInputValue
                    ref={inpRef}
                    style={{
                        width: '100%',
                        backgroundColor: colors.dark_blue,
                        borderRadius: 10,
                        height: 30,
                        borderColor: colors.dark_blue,
                        borderWidth: 2,
                        color: colors.aqua,
                        fontWeight: '500',
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontSize: 20,
                        flex: 1
                    }}
                    inlineImageLeft={'search-icon'}
                    endEditing={true}
                    onSetText={onSearch}
                    autoCorrect={false}
                    selectionColor={colors.red}
                    autoCapitalize={'none'}
                    placeholderTextColor={colors.light_blue}
                    placeholder={'Search Apps'}
                />
                <TouchableOpacity style={{marginLeft: 5}} onPress={clearInput}>
                    <Text style={{fontSize: 20, color: colors.pink}}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}