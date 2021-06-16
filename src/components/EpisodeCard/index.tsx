import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Text } from '@tarojs/components'

import { EpisodeType } from '@constants/types'
import { updateWikiCharacterList } from '@actions'

import './index.less'


interface EpisodeCardProps {
  episode: EpisodeType,
  showImage?: boolean,
  number?: number,
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
}) => {
  const dispatch = useDispatch()

  const handleClickCard = () => {
    dispatch(updateWikiCharacterList(episode.characters, {
      title: episode.episode,
      primary: episode.name,
      secondary: episode.air_date,
    }))
    Taro.navigateTo({
      url: '/pages/wiki/pages/episode/index',
    })
  }

  // 骨架屏
  if (!episode.name) {
    return (
      <View key={episode.id} className='e-card'>
        <View className='e-card-loading-left'></View>
        <View className='e-card-loading-right'>
          <View className='e-card-loading-name'></View>
          <View className='e-card-loading-date'></View>
        </View>
      </View>
    )
  }

  return (
    <View
      key={episode.id}
      className='e-card'
      onClick={handleClickCard}
      hoverClass='e-card_active'
      hoverStyle={{ opacity: 0.75 }}
    >
      <View className='e-card-left'>
        <Text className='e-card-left-episode'>{episode.episode.slice(0, 3)}</Text>
        <Text className='e-card-left-episode'>{episode.episode.slice(3, 6)}</Text>
      </View>
      <View className='e-card-right'>
        <View className='e-card-name'>
          <Text className='e-card-name-text'>{episode.name}</Text>
        </View>
        <View className='e-card-date'>
          <Text className='e-card-date-text'>{episode.air_date}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(EpisodeCard)