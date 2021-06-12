import React, { useState, useRef } from 'react'
import { View } from '@tarojs/components'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import { StatusBar } from "@components";
import colors from '@style/theme'
import { CharacterFilterType } from '@constants/types'

import { PageContent, DrawerContent } from './components'
import './index.less'


const AllCharacter: React.FC<any> = () => {
  const drawer = useRef() as React.MutableRefObject<DrawerLayout | null>
  const [filter, setFilter] = useState<CharacterFilterType>({
    name: '',
    status: 'all',
    species: 'all',
    type: 'all',
    gender: 'all',
  })


  if (process.env.TARO_ENV === 'rn') {
    return (
      <View className='all-character-container'>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <DrawerLayout
          ref={drawer}
          enableTrackpadTwoFingerGesture
          drawerWidth={210}
          keyboardDismissMode='on-drag'
          drawerPosition='right'
          drawerType='back'
          overlayColor='#00000000'
          drawerBackgroundColor={colors['theme-background']}
          renderNavigationView={() => <DrawerContent filter={filter} setFilter={setFilter} />}
          contentContainerStyle={{
            elevation: 100,
            backgroundColor: '#000',
          }}
        >
          <PageContent drawer={drawer} filter={filter} />
        </DrawerLayout>
      </View>
    )
  }


  return (
    <View className='all-character' >

    </View>
  )
}

export default AllCharacter
