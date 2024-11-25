import { View, Text, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react'
import Animationgif from '../assets/images/deliveryAnimation.gif'
import ProgressBar from 'react-native-progress/Bar';

export default function AnimationScreen({ navigation }) {
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery");
        }, 3000)
        setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
    }, [])

    return (
        <View className='bg-white w-full h-full justify-center items-center'>
            <ImageBackground source={Animationgif} resizeMode="contain" className='h-[25rem] w-full' ></ImageBackground>
            <ProgressBar progress={completed} width={200} height={10} backgroundColor='white' 
            color='orange' />
            <Text style={{fontStyle: 'italic'}} className='tracking-wider'>Preparing your food...</Text>
        </View>
    )
}
