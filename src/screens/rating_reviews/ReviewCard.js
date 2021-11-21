import React, {useState} from 'react';
import {LayoutAnimation, Text, TouchableOpacity, View} from 'react-native';
import {colors} from "../../global/styles";
import StarRating from "react-native-star-rating";
import {Ionicons} from "@expo/vector-icons";
import {CustomModal} from "../../components/CustomModal";
import {RatingsPage} from "../index";

export function ReviewCard({review, size, canExpand, defaultExpanded=false}) {

    const [isExpanded, setExpanded] = useState(defaultExpanded);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleExpanded = () => {
        if(!canExpand) {
            setModalOpen(!isModalOpen);
            return;
        }
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                250,
                LayoutAnimation.Types.easeInEaseOut,
            )
        );
        setExpanded(!isExpanded)
    }

    return (

        <>

            <CustomModal isOpen={isModalOpen} onClose={toggleExpanded}>
                <View style={{padding: 20, flex: 1, width: '100%'}}>
                    <RatingsPage reviewData={{reviews: [review]}} allExpanded={true} showHeader={false} />
                </View>
            </CustomModal>

            <View
                style={{
                    backgroundColor: colors.dark_blue,
                    padding: 10,
                    width: size ? size - 10 : undefined,
                    margin: 5,
                    borderRadius: 10,
                    overflow: 'hidden',
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


                <Text numberOfLines={canExpand ? isExpanded ? undefined : 3 : 3}
                      ellipsizeMode={'tail'}
                      style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: '500'
                      }}>{review.content}</Text>

                <View style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        onPress={toggleExpanded}
                        style={{marginTop: 5, right: 5, alignSelf: 'flex-end'}}>
                        <Text style={{color: colors.red, fontSize: 20}}>See {isExpanded ? 'Less' : 'More'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>

    )
};