import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { addToCart, removeFromCart } from '../components/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function Chechout({ route, navigation }) {
  const cart = useSelector(state => state.cart.cart)
  const delivreyFee = 0.25
  const totalFoodPrice = cart.reduce((total, food, index) => total += Number.parseFloat(food.price) * food.quantity, 0).toFixed(2)
  let totalPriceWithFee = Number.parseFloat(totalFoodPrice) + delivreyFee
  const dispatch = useDispatch()

  return (
    <SafeAreaView className='flex flex-col w-full h-full justify-start items-center px-[2%] pt-[4rem]'>
      <View className='flex flex-row justify-start items-center gap-[7rem] w-full'>
        <Link href={'/Home'}>
          <AntDesign name="leftcircle" size={35} color="orange" />
        </Link>
        <Text className='text-2xl font-bold'>My Oder</Text>
      </View>

      <View className='h-full w-full justify-between '>

        <ScrollView className='w-full h-[40rem] p-3 ' contentContainerStyle={styles.contentContainer}>

          <Text className='text-xl font-semibold'>Order List</Text>

          {cart.map(food => (
            <View className='h-[9rem] w-full justify-between flex flex-row' >
              <View className='flex flex-row h-full items-center gap-4'>
                <Image
                  source={{ uri: `${food.image}` }}
                  style={{ width: 100, height: 100, borderRadius: 20 }}
                />
                <View className='flex gap-2'>
                  <Text className='text-lg font-semibold'>{food.name}</Text>
                  <Text className='font-sm text-sm'>£{food.price}</Text>
                </View>
              </View>

              <View className='w-[7rem] border border-slate-100 rounded-full flex flex-row justify-between p-1 items-center '>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => { dispatch(removeFromCart(food.id)) }}
                  className='h-auto'
                >
                  <AntDesign name="minuscircle" size={30} color="black " />
                </TouchableHighlight>

                <Text>{food.quantity}</Text>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => { dispatch(addToCart(food)) }}
                  className='h-auto'
                >
                  <AntDesign name="pluscircle" size={30} color="orange" />
                </TouchableHighlight>
              </View>
            </View>
          ))}


        </ScrollView>

        <View className='w-full h-[15rem] flex flex-col justify-between pb-[4rem]'>
          <View className='flex flex-col gap-5 w-full'>
            <Text className='text-xl font-bold'>Order Summary</Text>
            <View className='w-full flex flex-row justify-between items-center'>
              <Text className='text-base font-bold text-slate-400'>Order Amount</Text>
              <Text className='text-base font-bold'>£{totalFoodPrice}</Text>
            </View>
            <View className='w-full flex flex-row justify-between items-center'>
              <Text className='text-base font-bold text-slate-400'>Delivrey Fee</Text>
              <Text className='font-xl font-bold'>£ 0.25</Text>
            </View>
          </View>
          <View className='w-full h-[1px] bg-slate-300'></View>

          <View className='flex flex-row w-full justify-between items-end'>
            <View className='flex gap-2'>
              <Text className='font-medium text-xl'>Total</Text>
              <Text className='font-semibold text-2xl'>£{totalFoodPrice < 1 ? 0 : totalPriceWithFee.toFixed(2)}</Text>
            </View>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => { navigation.navigate('AnimationScreen') }}
            >
              <View className='h-[3rem] w-[7rem] bg-orange-400 rounded-2xl justify-center items-center p-2 '>
                <Text className='text-white font-bold'>Submit Order</Text>
              </View>
            </TouchableHighlight>

          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
  }
});
