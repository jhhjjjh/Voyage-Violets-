import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'

const mockData = [
  {
    id: 1,
    title: '无锡之旅 离开甚至有点想哭',
    images: ['https://i.postimg.cc/13Fk7Kmx/1-666.jpg'],
    user: {
      avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31gl1jtjtji6g5o94f910801t9uuf3lo?imageView2/2/w/540/format/webp|imageMogr2/strip2/blur/1x56',
      nickname: '倒霉的回力666'
    },
    likes: 881,
    comments: 2293
  },
  {
    id: 2,
    title: '云南·大理 慢生活五日游全记录',
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/7c/9b/79/caption.jpg?w=600&h=600&s=1'],
    user: {
      avatar: 'https://dummyimage.com/300x200/87CEFA/000.jpg?text=joy',
      nickname: '背包旅人'
    },
    likes: 1254,
    comments: 874
  },
  {
    id: 3,
    title: '四川·成都 美食与熊猫一网打尽',
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/9c/19/b0/photo1jpg.jpg?w=1200&h=-1&s=1'],
    user: {
      avatar: 'https://dummyimage.com/300x200/98FB98/000.jpg?text=leo',
      nickname: '川蜀吃货团'
    },
    likes: 1933,
    comments: 3120
  },
  {
    id: 4,
    title: '03女大学生周末穷游三亚（极速省钱版🥹',
    images: ['https://i.postimg.cc/wM0NpJ9g/03-1.jpg'],
    user: {
      avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31f29rang6i004bng6kqkdjgl66nj6qg?imageView2/2/w/540/format/webp|imageMogr2/strip2',
      nickname: '会飞的椰子树'
    },
    likes: 2201,
    comments: 978
  },
  {
    id: 5,
    title: '西藏·拉萨 朝圣之旅六天五晚攻略',
    images: ['https://dummyimage.com/300x200/8A2BE2/FFFFFF.jpg?text=lasa'],
    user: {
      avatar: 'https://dummyimage.com/300x200/8A2BE2/FFFFFF.jpg?text=tibet',
      nickname: '高原自由行'
    },
    likes: 1428,
    comments: 1103
  },
  {
    id: 6,
    title: '浙江·乌镇 江南水乡摄影地图',
    images: ['https://dummyimage.com/300x200/00CED1/000.jpg?text=wuzhen'],
    user: {
      avatar: 'https://dummyimage.com/300x200/00CED1/000.jpg?text=art',
      nickname: '镜头下的世界'
    },
    likes: 953,
    comments: 487
  },
  {
    id: 7,
    title: '广西·桂林 山水甲天下两日游记',
    images: ['https://dummyimage.com/300x200/FFA07A/000.jpg?text=guilin'],
    user: {
      avatar: 'https://dummyimage.com/300x200/FFA07A/000.jpg?text=river',
      nickname: '小城旅行家'
    },
    likes: 1176,
    comments: 652
  }
]

const Index = () => {
  const [searchText, setSearchText] = useState('')

  const filteredData = mockData.filter(item =>
    item.title.includes(searchText)
  )

  return (
    <View className='page'>
      <View className='search-bar'>
        <SearchBar
          placeholder='搜索目的地或攻略'
          onChange={val => setSearchText(val)}
        />
      </View>

      <View className='masonry'>
        <View className='column'>
          {filteredData.filter((_, i) => i % 2 === 0).map(item => (
            <View className='card' key={item.id}>
              <Image className='card-img' src={item.images[0]} mode='widthFix' />
              <View className='card-title'>{item.title}</View>
              <View className='card-user'>
                <Image className='avatar' src={item.user.avatar} />
                <View className='nickname'>{item.user.nickname}</View>
              </View>
              <View className='card-footer'>
                ❤️ {item.likes} &nbsp;&nbsp; 💬 {item.comments}
              </View>
            </View>
          ))}
        </View>
        <View className='column'>
          {filteredData.filter((_, i) => i % 2 === 1).map(item => (
            <View className='card' key={item.id}>
              <Image className='card-img' src={item.images[0]} mode='widthFix' />
              <View className='card-title'>{item.title}</View>
              <View className='card-user'>
                <Image className='avatar' src={item.user.avatar} />
                <View className='nickname'>{item.user.nickname}</View>
              </View>
              <View className='card-footer'>
                ❤️ {item.likes} &nbsp;&nbsp; 💬 {item.comments}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Index
