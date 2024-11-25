import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGetAllFoodsQuery } from '../../features/apiSlice'
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Categories() {
  const { data: allFoods = [], isLoading } = useGetAllFoodsQuery()
  const navigation = useNavigation();

  if(isLoading) return <Text>Loading</Text>

  return (
    <>
      {allFoods.map((foods, index) => (
        <TouchableOpacity
          key={index}
          className='h-[12rem] w-[12rem] rounded-xl justify-center items-start'
          onPress={() => { navigation.navigate('Food', { id: foods.id}) }}
        >
          <Image
            source={{ uri: `${foods.image}` }}
            style={{ width: 160, height: 100, borderRadius: 10 }}
          />
          <View className='flex flex-row w-full px-2 justify-between items-center'>
            <Text className='font-medium text-lg'>{foods.name}</Text>
            <View className='flex flex-row'>
              <AntDesign name="star" size={17} color="orange" />
              <Text>4.6</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  )
}