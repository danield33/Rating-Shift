import React from 'react';
import {FlatList, View} from 'react-native';
import {Styles} from "../../global";
import {useNavigation} from "@react-navigation/native";
import {ReviewHeader} from "./ReviewHeader";
import {Line} from "../../components/Line";
import {ReviewCard} from "./ReviewCard";



export default function RatingsPage({reviewData, allExpanded, showHeader=true}) {

    const navigation = useNavigation();
    const reviews = reviewData ?? navigation.getState().routes[2].params.params.reviews;

    const renderItem = (item) => {
        const review = item.item;
        return <ReviewCard review={review} canExpand={true} defaultExpanded={allExpanded}/>
    }

    return (
        <View style={Styles.background}>

            {showHeader ? (
                <>
                    <View style={{width: '100%'}}>
                        <ReviewHeader reviews={reviews} hideButton={true}/>
                    </View>
                    <Line style={{marginBottom: 0}}/>
                </>
                )
                : null

            }

            <FlatList data={reviews.reviews}
                      style={{width: '100%', flex: 1}}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderItem}
            />

        </View>
    );
};