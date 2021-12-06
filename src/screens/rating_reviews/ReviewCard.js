import React, {useState} from 'react';
import {LayoutAnimation, Text, TouchableOpacity, View} from 'react-native';
import {colors} from "../../global/styles";
import {CustomModal} from "../../components/CustomModal";
import {If} from "../../components/If";
import {CustomStarRating} from "../../components/CustomStarRating";

export function ReviewCard({review, size, canExpand, renderModal = true, defaultExpanded = false}) {

    const [isExpanded, setExpanded] = useState(defaultExpanded);
    const [isModalOpen, setModalOpen] = useState(false);

    const reviewObj = review.attributes;

    const toggleExpanded = () => {
        if (!canExpand) {
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

            <If can={renderModal}>
                <CustomModal isOpen={isModalOpen} onClose={toggleExpanded}>
                    <View style={{padding: 20, flex: 1, width: '100%', alignItems: 'center'}}>
                        <ReviewCard review={review} size={size} canExpand={true} defaultExpanded={true}
                                    renderModal={false}/>
                    </View>
                </CustomModal>
            </If>


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
                            numberOfLines={3}
                            adjustsFontSizeToFit={true}
                        >
                            {reviewObj.title}</Text>

                        <CustomStarRating rating={reviewObj.rating}
                                          isDisabled={true}
                                          containerStyle={{justifyContent: undefined}}
                                          starStyle={{marginLeft: 5}}
                                          starSize={15}/>

                    </View>

                    <View style={{alignItems: 'flex-end', flex: 1}}>
                        <Text style={{color: colors.aqua, fontWeight: '600'}}>{reviewObj.date.split('T')[0]}</Text>
                        <Text style={{color: colors.aqua, fontWeight: '600'}}>{reviewObj.userName}</Text>
                    </View>

                </View>


                <Text numberOfLines={canExpand ? isExpanded ? undefined : 3 : 3}
                      ellipsizeMode={'tail'}
                      style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: '500'
                      }}>{reviewObj.review}</Text>

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
}