import {  Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import burger from '../../../assets/categories/burger.png'
import chicken from '../../../assets/categories/chicken.png'
import drink from '../../../assets/categories/drink.png'
import icecream from '../../../assets/categories/icecream.png'
import pasta from '../../../assets/categories/pasta.png'
import pizza from '../../../assets/categories/pizza.png'

export default function Categories() {
  const images = [
    { image: burger, title: 'burger' },
    { image: chicken, title: 'chicken' },
    { image: drink, title: 'drink' },
    { image: icecream, title: 'icecream' },
    { image: pasta, title: 'pasta' },
    { image: pizza, title: 'pizza' }
  ]

  return (
    <>
      {images.map((category, index) => (
        <TouchableOpacity
          key={index}
          className='h-[8rem] w-[8rem] bg-slate-200 rounded-xl justify-center items-center'
        >
          <Image
            source={category.image}
            style={{ width: 90, height: 90 }}
          />
          <Text className='font-medium text-lg pb-3'>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </>
  )
}