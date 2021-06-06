import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'

import { WikiCharacterType } from '@constants/types'
import { updateWikiCharacter } from '@actions'
import { defaultCharacterImage } from '@assets/image'

import './index.less'


interface CharacterCardProps {
  character: WikiCharacterType
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character
}) => {
  const dispatch = useDispatch()

  const handleClickCard = () => {
    dispatch(updateWikiCharacter(character))
    Taro.navigateTo({
      url: '/pages/wiki/pages/character/index',
    })
  }

  // 骨架屏
  if (!character.name) {
    return (
      <View key={character.id} className='c-card'>
        <Image className='c-card-img character-loading-img' src={defaultCharacterImage} mode='widthFix' />
        <View className='c-card-content'>
          <View className='c-card-loading-name'></View>
          <View className='c-card-loading-status'></View>
          <View className='c-card-loading-title'></View>
          <View className='c-card-loading-text'></View>
        </View>
      </View>
    )
  }

  return (
    <View key={character.id} className='c-card' onClick={handleClickCard}>
      <Image className='c-card-img' src={character.image} mode='widthFix' lazyLoad />
      <View className='c-card-content'>
        <Text className='c-card-name'>{character.name}</Text>
        <View className='c-card-status'>
          <View className={`character-status-point character-status_${character.status}`}></View>
          <Text className='c-card-status-text'>{character.status}</Text>
          <Text className='c-card-status-text'>&nbsp;-&nbsp;</Text>
          <Text className='c-card-status-text'>{character.species}</Text>
        </View>

        <View className='c-card-title'>
          <Text className='c-card-title-text'>location:</Text>
        </View>
        <Text className='c-card-text'>{character.location.name}</Text>
      </View>
    </View>
  )
}

export default memo(CharacterCard)