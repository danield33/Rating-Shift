import React from 'react';
import {FlatList, View} from 'react-native';
import {Styles} from "../../global";
import {useNavigation} from "@react-navigation/native";
import {ReviewHeader} from "./ReviewHeader";
import {Line} from "../../components/Line";
import {ReviewCard} from "./ReviewCard";

const renderItem = (item) => {
    const review = item.item;
    return <ReviewCard review={review}/>
}

export default function RatingsPage({reviewData}) {

    const navigation = useNavigation();
    const reviews = reviewData ?? navigation.getState().routes[2].params.params.reviews;

    return (
        <View style={Styles.background}>

            <View style={{width: '100%'}}>
                <ReviewHeader reviews={reviews} hideButton={true}/>
            </View>
            <Line style={{marginBottom: 0}}/>

            <FlatList data={reviews.reviews}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderItem}
            />

        </View>
    );
};