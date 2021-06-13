import React, { useEffect, useState, useRef } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'

import { StatusBar, CustomScrollView, CharacterCard, Iconfont } from "@components";
import { getCharacter } from '@service'
import { CharacterType } from '@constants/types'
import { wikiBackground } from '@assets/image'
import { defaultRandomCharacters } from '@constants/wiki'
import { isArray } from '@utils'

import { headerBtnsType } from './type'
import './index.less'


const headerBtns: headerBtnsType[] = [
  {
    value: '角色',
    onClick: () => Taro.navigateTo({
      url: '/pages/wiki/pages/all-character/index',
    }),
  },
  {
    value: '剧集',
    onClick: () => null,
  },
]

// 随机获取角色信息列表
const generateRandomCharacters = (number: number) => {
  const rids: number[] = []
  for (let i = 0; i < number; i++) {
    let rid: number
    do {
      rid = Math.floor(Math.random() * 671) + 1
    } while (rids.indexOf(rid) !== -1)
    rids.push(rid)
  }
  return getCharacter.list(rids)
}


const Wiki: React.FC<any> = () => {
  const [randomCharacters, setRandomCharacters] = useState<CharacterType[]>(defaultRandomCharacters)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const ScrollViewRef = useRef() as React.MutableRefObject<any>

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  // 默认随机生成6个
  useEffect(() => {
    generateRandomCharacters(6)
      .then((data) => setRandomCharacters(data))
  }, [])

  const onRefresh = () => {
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    // 滚到顶部
    if (process.env.TARO_ENV === 'rn') {
      ScrollViewRef.current.scrollTo({ y: 0 })
    } else {
      // Taro.pageScrollTo({ scrollTop: 0, selector: '.custom-scroll-view' })
      
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300,
        success: function(res) {
          console.log(res);
          
        }
      })
    }
    return generateRandomCharacters(6)
      .then((data) => {
        Taro.hideLoading()
        if (isArray(data)) {
          setRandomCharacters(data)
        }
      })
  }

  return (
    <CustomScrollView className='wiki' autoHideTab onRefresh={onRefresh} ref={ScrollViewRef} >
      <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <View className='wiki-header' style={{ marginTop: statusBarHeight }}>
        <Image src={wikiBackground} className='wiki-header-background' mode='widthFix' />
      </View>

      <View className='wiki-content'>
        <View className='wiki-content-top'>
          {
            headerBtns.map((btn, index) => (
              <Button
                key={btn.value}
                className={`wiki-content-btn wiki-content-btn_${index === headerBtns.length - 1 && 'last'}`}
                hoverClass='wiki-content-btn_active'
                hoverStyle={{ opacity: 0.6 }}
                onClick={btn.onClick}
              >
                <Text className='wiki-content-btn-value'>{btn.value}</Text>
              </Button>
            ))
          }
        </View>
        {
          randomCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </View>

      <View className='wiki-footer'>
        <Button
          className='wiki-footer-btn'
          style={{ bottom: 0 }}
          onClick={onRefresh}
          hoverClass='wiki-footer-btn_active'
          hoverStyle={{ opacity: 0.6 }}
        >
          <Iconfont name='swap' size={56} />
        </Button>
      </View>

    </CustomScrollView>
  )
}

export default Wiki
