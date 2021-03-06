import * as React from 'react';
import {useState} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Styles} from "../../global";
import {SearchBar} from "../search/SearchBar";
import {Line} from "../../components/Line";
import {useSelector} from "react-redux";
import {CustomModal} from "../../components/CustomModal";
import {AppInList} from "../apps_list/AppInList";
import {ReviewCard} from "../rating_reviews/ReviewCard";

export function Reviews() {

    const user = useSelector(state => state.account.currentUser);
    const [apps, setApps] = useState(Object.keys(user.activity.reviews))
    const [reviews, setReviews] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const onSearch = (text) => {
        setSearchFilter(text.trim())
    }

    const renderApp = (item) => {
        const appID = item.item;
        return <AppInList appID={appID} onPressOvewrite={(app) => {
            const appReviews = user.activity.reviews[appID];
            for (const appReview of app.reviews.reviews) {
                if (appReviews.includes(appReview.id)) {
                    reviews.push(appReview);
                }
            }
            setReviews(reviews);
            setModalOpen(true);
        }} hidden={(app) => {
            return !app.trackCensoredName.toLowerCase().startsWith(searchFilter.toLowerCase())
        }}/>
    }

    const renderCard = (item) => {
        const review = item.item;
        return (
            <Pressable>
                <ReviewCard review={review} defaultExpanded={false} canExpand={true}/>
            </Pressable>
        )
    }

    return (
        <View style={Styles.background}>

            <CustomModal isOpen={modalOpen} onClose={() => {
                setReviews([])
                setModalOpen(false)
            }}>
                <View style={{marginTop: 80}}/>
                <FlatList data={reviews}
                          style={{width: '100%'}}
                          renderItem={renderCard}
                          keyExtractor={(i) => i.id}
                />
            </CustomModal>

            <SearchBar onSearch={onSearch} onClear={() => setSearchFilter('')}/>
            <Line/>
            <FlatList data={apps}
                      renderItem={renderApp}
                      keyExtractor={i => i}
                      style={{width: '100%'}}
            />
        </View>
    );
}