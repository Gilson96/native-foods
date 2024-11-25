import React, { useState } from 'react';
import { Modal, Portal} from 'react-native-paper';
import { View, Text, TextInput, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGetAllFoodsQuery } from '../../features/apiSlice'
import { useNavigation } from '@react-navigation/native';


export default function SearchFood({ hideModal, imageCard, food }) {
    const [inputValue, setInputValue] = useState()
    const { data: allFoods = [], isLoading } = useGetAllFoodsQuery()
    const navigation = useNavigation();

    const foodExist = () => {
        return allFoods.some(food => food.name === inputValue)
    }

    const finddExistingFood = () => {
        return allFoods.find(food => food.name === inputValue)
    }

    const containerStyle = {
        backgroundColor: 'white',
        padding: 10,
        width: 90 + '%',
        height: 62 + '%',
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        gap: 5,
        borderRadius: 10
    };

    if(isLoading) return <Text>Loading</Text>
    return (
        <Portal>
            <Modal
                visible={true}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
            >
                <View className='w-full h-full'>
                    <View className='w-full flex flex-row gap-2 justify-center items-center'>
                        <Text href={'/Home'} onPress={hideModal}>
                            <AntDesign name="leftcircle" size={35} color="orange" />
                        </Text>
                        <TextInput
                            onChangeText={text => setInputValue(text.trim())}
                            value={inputValue}
                            placeholder="Search food, drink, desserts"
                            keyboardType="text"
                            className='border border-slate-200 w-[90%] p-2 rounded-2xl'
                        />
                    </View>
                    {!foodExist() ?
                        <Text>Look for available foods</Text>
                        :
                        <View className='w-full h-[90%] flex flex-col justify-between items-start p-2'>
                            <View>
                                <Image
                                    source={{ uri: `${finddExistingFood().image}` }}
                                    style={{ width: 300, height: 200, borderRadius: 20 }}
                                />
                            </View>
                            <View className='flex flex-row w-full px-2 py-1 justify-between items-center'>
                                <Text className='font-medium text-2xl'>{finddExistingFood().name}</Text>
                                <View className='flex flex-row gap-1'>
                                    <AntDesign name="star" size={17} color="orange" />
                                    <Text className='font-medium'>4.5</Text>
                                </View>
                            </View>
                            <View className='w-full flex flex-col px-2 py-1'>

                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                                <Text className='mt-2 text-2xl text-right'>£{finddExistingFood().price}</Text>
                                <View
                                    className='flex flex-col w-full h-[4rem] bg-orange-400 justify-center items-center  rounded-md mt-1'
                                    onPress={() => { navigation.navigate('Food'); hideModal(); }}
                                >
                                   <Text className='text-white text-xl'>See more</Text>
                                </View>
                            </View>

                        </View>
                    }
                </View>
            </Modal>
        </Portal>
    )
}