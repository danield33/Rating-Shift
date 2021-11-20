import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {colors} from "../../global/styles";
import StarRating from "react-native-star-rating";
import {Ionicons} from "@expo/vector-icons";

export function ReviewCard({review, size, canExpand = false}) {

    const startingHeight = 70;
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
    const [isExpanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(70);
    const [titleHeight, setTitleHeight] = useState(70)

    useEffect(() => {
        console.log(contentHeight + titleHeight, 'fHeight')
        Animated.spring(animatedHeight, {
            friction: 500,
            toValue: isExpanded ? contentHeight + titleHeight : startingHeight,
            useNativeDriver: false
        }).start();
    }, [isExpanded])

    const onTextLayout = (event) => {
        let {height} = event.nativeEvent.layout;
        console.log(height, 'height');
        height = Math.floor(height) + 40;
        if (height > startingHeight) {
            setContentHeight(height);
        }
    }

    const toggleShow = () => {
        if (canExpand)
            setExpanded(!isExpanded)
    }

    return (

        <Animated.View style={{
            backgroundColor: colors.dark_blue,
            padding: 10,
            width: size ? size - 10 : undefined,
            margin: 5,
            borderRadius: 10,
            overflow: 'hidden',
            height: animatedHeight
        }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} onLayout={(e) => {
                const {height} = e.nativeEvent.layout;
                console.log(height, 'tHeight')
                setTitleHeight(height);
            }}>
                <View>
                    <Text
                        style={{
                            color: colors.aqua,
                            fontSize: 20,
                            fontWeight: '600',
                        }}
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}
                    >
                        {review.title}</Text>

                    <StarRating
                        disabled={true}
                        starSize={15}
                        fullStarColor={colors.red}
                        halfStar={colors.red}
                        rating={review.rating}
                        maxStars={5}
                        halfStarEnabled={true}
                        containerStyle={{justifyContent: undefined}}
                        starStyle={{marginLeft: 5}}
                    />
                </View>

                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{color: colors.aqua, fontWeight: '600'}}>{review.date}</Text>
                    <Ionicons name={'logo-apple'} color={'white'} size={20}/>
                </View>

            </View>

            <Text numberOfLines={canExpand ? undefined : 3}
                  ellipsizeMode={canExpand ? undefined : 'tail'}
                  onLayout={onTextLayout}
                  style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '500'
                  }}>{review.content}</Text>

            <View style={{justifyContent: 'flex-end', flex: 1}}>
                <TouchableOpacity
                    onPress={toggleShow}
                    style={{marginTop: 5, right: 5, alignSelf: 'flex-end'}}>
                    <Text style={{color: colors.red, fontSize: 20}}>See More</Text>
                </TouchableOpacity>
            </View>

        </Animated.View>

    )
};