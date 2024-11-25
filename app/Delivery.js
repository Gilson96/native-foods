import { View, Text, ImageBackground, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import map from '../assets/images/map.jpg'
import AntDesign from '@expo/vector-icons/AntDesign';
import thankYou from '../assets/images/thankYou.png'

export default function Delivery({ navigation }) {
    return (
        <View className='h-full w-full flex flex-col justify-between'>
            <ImageBackground source={map} resizeMode="cover" className='h-[35rem] w-full flex flex-row justify-between pt-[3rem] px-[1rem] items-start -z-50' >
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="transparent"
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <View>
                        <AntDesign name="leftcircle" size={35} color="orange" />
                        <Text>Order Track</Text>
                    </View>
                </TouchableHighlight>
            </ImageBackground>
            <View className='w-full h-[40rem] z-30 bg-white rounded-t-2xl flex flex-col p-2 items-center mb-8'>
                <View className='w-full flex flex-row justify-between px-2'>
                    <Text className='text-[5rem]' style={{ fontSize: 20 }}>Your was order successful</Text>
                    <AntDesign name="checkcircle" size={24} color="green" />
                </View>
                <View className='w-[90%] h-[1px] mt-2 bg-slate-200'></View>
                <View className='flex flex-row items-center justify-start w-full px-3 mt-5'>
                    <AntDesign name="infocirlceo" size={45} color="orange" />
                    <View className='flex flex-row w-full gap-2 pl-5'>
                        <Text className='text-2xl font-bold'>On the way</Text>
                        <Text className='text-2xl font-bold text-orange-400'>14 min</Text>
                    </View>
                </View>
                {/* <Image source={thankYou}
                    style={{ width: 150, height: 120, borderRadius: 10 }} /> */}
            </View>
        </View>
    )
}