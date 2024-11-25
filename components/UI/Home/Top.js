import React from 'react'
import { View, Text, Image } from 'react-native'

const Top = ({imageBanner}) => {
  return (
    <View className='w-full h-full bg-orange-400 flex flex-row justify-between rounded-2xl'>
      <View className='flex flex-col justify-evenly pl-4'>
        <View>
          <Text className='text-xl text-white'>Grab Our Exclusive</Text>
          <Text className='text-xl text-white'>Food Discounts Now!</Text>
        </View>

        <View className='w-[8rem] h-[3rem] bg-slate-700 rounded-xl justify-center items-center'>
          <Text className='text-white'>Order Now</Text>
        </View>
      </View>
      <Image source={{uri: `${imageBanner}`}}
       style={{width: 150, height: 140, borderRadius: 10}} />
    </View>
  )
}

export default Top