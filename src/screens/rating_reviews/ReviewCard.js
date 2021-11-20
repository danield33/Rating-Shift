import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View, LayoutAnimation} from 'react-native';
import {colors} from "../../global/styles";
import StarRating from "react-native-star-rating";
import {Ionicons} from "@expo/vector-icons";

export function ReviewCard({review, size, canExpand}) {

    const startingHeight = 150;
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
    const [isExpanded, setExpanded] = useState(false);
    const [fullHeight, setFullHeight] = useState(startingHeight);

    useEffect(() => {
        Animated.spring(animatedHeight, {
            friction: 500,
            toValue: isExpanded ? fullHeight : startingHeight,
            useNativeDriver: false
        }).start();
    }, [isExpanded])

    const onTextLayout = (event) => {
        let {height} = event.nativeEvent.layout;
        height = Math.floor(height) + 40;
        const titleHeight = Math.abs(startingHeight - height);
        console.log(height, startingHeight - titleHeight)
        if (height > titleHeight) {
            setFullHeight(height + titleHeight);
        }
    }

    return (

        <View
            style={{
                backgroundColor: colors.dark_blue,
                padding: 10,
                width: size ? size - 10 : undefined,
                margin: 5,
                borderRadius: 10,
                overflow: 'hidden',
                flex: canExpand ? 1 : undefined,
            }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1}}>
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

                <View style={{alignItems: 'flex-end', flex: 1}}>
                    <Text style={{color: colors.aqua, fontWeight: '600'}}>{review.date}</Text>
                    <Ionicons name={'logo-apple'} color={'white'} size={20}/>
                </View>

            </View>

            <View style={{flex: 1}}
                  onLayout={onTextLayout}>
                <Text numberOfLines={canExpand ? isExpanded ? undefined : 3 : 3}
                      ellipsizeMode={'tail'}
                      style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: '500'
                      }}>{review.content}</Text>
            </View>

            <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => {
                        LayoutAnimation.configureNext(
                            LayoutAnimation.create(
                                500,
                                LayoutAnimation.Types.easeInEaseOut,
                            )
                        );
                        setExpanded(!isExpanded)
                    }}
                    style={{marginTop: 5, right: 5, alignSelf: 'flex-end'}}>
                    <Text style={{color: colors.red, fontSize: 20}}>See More</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
};