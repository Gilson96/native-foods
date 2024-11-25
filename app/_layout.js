import React from 'react'
import "../global.css"
import { store } from '../store'
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import Food from './Food'
import Chechout from './Checkout'
import AnimationScreen from './AnimationScreen'
import Delivery from './Delivery'

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Provider store={store} >
      <PaperProvider>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Food" component={Food} screenOptions={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Chechout} screenOptions={{ headerShown: false }} />
          <Stack.Screen name="AnimationScreen" component={AnimationScreen} options={{}} />
          <Stack.Screen name="Delivery" component={Delivery} options={{}} />
        </Stack.Navigator>
      </PaperProvider>
    </Provider>
  );
}

export default HomeScreen

