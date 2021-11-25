import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Text, View} from 'react-native';
import {colors} from "../../global/styles";

export function AppDescription({description}) {

    const startingHeight = 50;
    const [isExpanded, setExpanded] = useState(false);
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;

    useEffect(() => {
        Animated.spring(animatedHeight, {
            friction: 500,
            toValue: isExpanded ? fullHeight : startingHeight,
            useNativeDriver: false
        }).start();
    }, [isExpanded])

    const toggleShow = () => {
        setExpanded(!isExpanded);
    }

    const onTextLayout = (event) => {
        let {height} = event.nativeEvent.layout;
        height = Math.floor(height) + 40;
        if (height > startingHeight) {
            setFullHeight(height);
        }
    }

    return (
        <View style={{flex: 1, width: '100%'}}>
            <Animated.View style={{height: animatedHeight, flex: 1, overflow: 'hidden'}}>
                <View style={{flex: 1, position: 'absolute'}} onLayout={onTextLayout}>
                    <Text style={{color: 'white', fontSize: 15}}
                          ellipsizeMode={'tail'}
                    >{description}</Text>
                </View>
            </Animated.View>

            <Button title={'Show ' + (isExpanded ? 'Less' : 'More')} color={colors.aqua} onPress={toggleShow}/>

        </View>
    );
}