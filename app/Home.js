import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Top from '../components/UI/Home/Top';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../components/UI/Home/Categories'
import FeaturedFood from '../components/UI/Home/FeaturedFood'
import { useGetAllFoodsQuery } from '../components/features/apiSlice'
import SearchFood from '../components/UI/Home/SearchFood';
import { TouchableOpacity } from 'react-native';
import RecommendedFood from '../components/UI/Home/RecommendedFoods'
import { useSelector } from 'react-redux';

function Home({ navigation, route }) {
    const { data: allFoods = [], isLoading } = useGetAllFoodsQuery()
    const [showShearchedFoods, setShowShearchedFoods] = useState()
    const cart = useSelector(state => state.cart.cart)

    if (isLoading) return <Text>is isLoading</Text>

    return (
        <SafeAreaView className='flex flex-col w-full h-full justify-start items-center px-[2%]'>

            <ScrollView className={`flex flex-col h-full w-full`}>

                {/* Search foods modal */}
                {showShearchedFoods &&
                    <SearchFood
                        hideModal={() => setShowShearchedFoods(false)}
                    />
                }

                {/* Landing page */}
                <View className={`flex flex-col justify-between w-full h-[11rem] bg-white pt-[3rem]`}>
                    <View className='flex flex-row justify-between items-center w-full'>
                        <Text className='text-2xl w-[70%]'>Order Your Favourite Fast Food!</Text>
                        <View className='bg-white w-[5rem] h-[3rem] rounded-full justify-center items-center border border-slate-200'>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Checkout')}
                                className='flex flex-row justify-between items-center px-4 w-full'
                            >
                                <Text>{cart.length}</Text>
                                <AntDesign name="shoppingcart" size={24} color="orange" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        className='flex-row justify-between gap-2 w-full border border-slate-200 py-2 px-3 rounded-xl'
                        onPress={() => { setShowShearchedFoods(true) }}
                    >
                        <View className='w-full flex flex-row justify-between'>
                            <Entypo name="magnifying-glass" size={24} color="black" />
                            <AntDesign name="bars" size={24} color="orange" />
                        </View>
                    </TouchableOpacity>

                </View>
                <View className='flex justify-center items-center h-[10rem] w-full mt-3'>
                    <Top imageBanner={allFoods.find(food => food.id === 1).image} />
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal={true}
                    className='h-[10rem] w-full mt-3'
                    contentContainerStyle={styles.contentContainer}
                >
                    <Categories />
                </ScrollView>

                {/* Featured foods */}
                <View className='flex flex-row w-full justify-between'>
                    <Text className='font-bold text-xl'>Featured Food</Text>
                    <Text className='text-slate-500'>See all</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    className=' h-[13rem] w-full'
                    contentContainerStyle={styles.contentContainer}
                >
                    <FeaturedFood />
                </ScrollView>

                {/* Recommended foods */}
                <View className='flex flex-row w-full justify-between'>
                    <Text className='font-bold text-xl'>Recommended For You</Text>
                    <Text className='text-slate-500'>See all</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    className=' h-[13rem] w-full'
                    contentContainerStyle={styles.contentContainer}
                >
                    <RecommendedFood />
                </ScrollView>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        gap: 10
    }
});


export default Home