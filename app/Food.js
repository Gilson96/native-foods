import { View, Text, SafeAreaView, ImageBackground, TouchableHighlight } from 'react-native'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useGetAllFoodsQuery } from '../components/features/apiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart} from '../components/features/cartSlice'
import { TouchableOpacity } from 'react-native';

export default function Food({ route, navigation }) {
    const [selectMeat, setSelectMeat] = useState(false)
    const [selectDrink, setSelectDrink] = useState(false)
    const [selectSide, setSelectSide] = useState(false)
    const { id } = route.params;
    const { data: allFoods = [], isLoading } = useGetAllFoodsQuery()
    const getCart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    if (isLoading) return <Text>is Loading</Text>

    const getSearchedFood = () => {
        return allFoods.find(food => food.id === id)
    }
    const getFoodInBasket = () => {
        return getCart.find(food => food.id === id)
    }
    const getFoodTotalPrice = (selectedExtra) => {
        let totalPrice = 0
        let foodPrice = getFoodInBasket() === undefined ? 0 : getFoodInBasket().price
        let foodQauntity = getFoodInBasket() === undefined ? 0 : getFoodInBasket().quantity

        if (selectMeat) { totalPrice += 2.50 } else { totalPrice += 0 }
        if (selectDrink) { totalPrice += 2.50 } else { totalPrice += 0 }
        if (selectSide) { totalPrice += 2.50 } else { totalPrice += 0 }

        return foodPrice * foodQauntity + totalPrice
    }

    const foodImage = { uri: getSearchedFood().image };

    return (
        <SafeAreaView className={`flex flex-col w-full h-full justify-start items-center `}>

            <ImageBackground source={foodImage} resizeMode="cover" className='h-[20rem] w-full flex flex-row justify-between pt-[3rem] px-[1rem] items-start' >
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="transparent"
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <AntDesign name="leftcircle" size={35} color="orange" />
                </TouchableHighlight>
            </ImageBackground>

            <View className='bg-white h-full w-full rounded-t-2xl flex flex-col px-2 pt-[1rem]'>
                <View className='flex flex-row justify-between w-full items-center'>
                    <Text className='text-2xl font-semibold'>{getSearchedFood().name}</Text>
                    <View className='w-[7rem] border border-slate-100 rounded-full flex flex-row justify-between p-1 items-center bg-gray-100'>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => { getFoodInBasket() !== undefined && dispatch(removeFromCart(getFoodInBasket().id)) }}
                        >
                            <AntDesign name="minuscircle" size={30} color="black" />
                        </TouchableHighlight>

                        <Text>{getFoodInBasket() === undefined ? getSearchedFood().quantity : getFoodInBasket().quantity}</Text>

                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() =>  {return dispatch(addToCart(getSearchedFood())) } }
                        >
                            <AntDesign name="pluscircle" size={30} color="orange" />
                        </TouchableHighlight>
                    </View>
                </View>

                <View className='w-full mt-2 flex flex-row justify-between items-center h-[7rem] px-[4rem]'>
                    <View>
                        <Text className='text-lg text-slate-600'>Ratings</Text>
                        <View className='flex flex-row items-end gap-1'>
                            <AntDesign name="star" size={17} color="orange" />
                            <Text className='text-sm text-slate-600'>4.8</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='text-lg text-slate-600'>Time</Text>
                        <View className='flex flex-row items-end gap-1'>
                            <MaterialIcons name="watch-later" size={17} color="orange" />
                            <Text className='text-sm text-slate-600'>10 min</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='text-lg text-slate-600'>Calories</Text>
                        <View className='flex flex-row items-end gap-1'>
                            <FontAwesome5 name="fire" size={17} color="orange" />
                            <Text className='text-sm text-slate-600'>4.8 kcal</Text>
                        </View>
                    </View>
                </View>

                <View className='w-full'>
                    <Text className=' text-slate-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </View>

                <View className='w-full mt-3'>
                    <Text className='text-lg font-bold'>Add Extra Additional</Text>
                </View>

                <View className='flex flex-col gap-2 mb-[3rem]'>
                    <View className='flex flex-row w-full justify-between mt-2'>
                        <View className='flex flex-row items-center gap-2'>
                            <Text>
                                <AntDesign
                                    name="checkcircle"
                                    size={20}
                                    color={selectMeat ? 'orange' : 'gray'}
                                    onPress={() => { setSelectMeat(!selectMeat) }}
                                />
                            </Text>
                            <Text>More Meat</Text>
                        </View>
                        <Text>£2.50</Text>
                    </View>

                    <View className='flex flex-row w-full justify-between mt-2'>
                        <View className='flex flex-row items-center gap-2'>
                            <Text>
                                <AntDesign
                                    name="checkcircle"
                                    size={20}
                                    color={selectDrink ? 'orange' : 'gray'}
                                    onPress={() => setSelectDrink(!selectDrink)}
                                />
                            </Text>
                            <Text>More Drink</Text>
                        </View>
                        <Text>£2.50</Text>
                    </View>

                    <View className='flex flex-row w-full justify-between mt-2'>
                        <View className='flex flex-row items-center gap-2'>
                            <Text>
                                <AntDesign
                                    name="checkcircle"
                                    size={20}
                                    color={selectSide ? 'orange' : 'gray'}
                                    onPress={() => setSelectSide(!selectSide)}
                                />
                            </Text>
                            <Text>More Side</Text>
                        </View>
                        <Text>£2.50</Text>
                    </View>
                </View>

                <TouchableOpacity className='w-full h-[4rem] bg-orange-400 flex justify-center items-center rounded-full'>
                    <TouchableOpacity>
                        <Text
                            className='text-white text-lg font-bold'
                            onPress={() => {
                                navigation.navigate('Home')
                               
                            }}
                        >Add To Basket | £ {getFoodTotalPrice()}
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}