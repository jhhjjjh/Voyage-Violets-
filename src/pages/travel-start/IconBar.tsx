import { useState } from 'react'
import { View, Text, Image, Video } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { NavBar, Input, Button } from '@nutui/nutui-react-taro'
import './index.scss'

const TravelBlogDetail = () => {
  // State variables
  const [commentText, setCommentText] = useState('')
  
  // Mock data for travel blog
  const travelBlog = {
    id: '1',
    title: '别有天地在台州',
    destination: '杭州、台州等3地',
    departureTime: '2月',
    duration: '7天',
    averageCost: '5.0千',
    companions: '夫妻',
    content: [
      '三人行，必有我师焉。对于吃和旅行，我一向是善于和乐于博采众长的。',
      '台州，自从看了闺蜜出游的照片，我就被那个童话般的七彩小村庄深深种草了。',
      '意大利的五渔村，是我一直惦记着的欧洲之旅，其中很重要的一站。近几年，由于各种原因未能远行，这个中国版的五渔村，必须在二人世界旅行中，排挤其他省市的各个地方，加塞儿跃居到了第一位！',
      '春运，是中国特有的一个名词，家居住在本地的我'
    ],
    likes: 2,
    comments: [],
    favorites: 0,
  }
  
  // Handle functions
 const handleBack = () => {
    Taro.navigateTo({ url: '/pages/index/index' })
  }


  const handleComment = () => {
    if (commentText.trim()) {
      Taro.showToast({ title: '评论成功' })
      setCommentText('')
    }
  }
  

  const handleShare = () => {
    Taro.showToast({ title: '分享成功' })
  }

  return (
      <View className='travel-blog-container'>
      {/* 修改顶部导航 */}
<View className='custom-navbar'>
  <View className='navbar-left' onClick={handleBack}>
    <Image
      className='back-icon'
      src='https://img.icons8.com/ios-filled/50/000000/left.png'
      mode='aspectFit'
    />
  </View>
  <Text className='navbar-title'>{travelBlog.title}</Text>
</View>

         {/* 添加媒体演示 */}
      <View className='main-image-area'>
        <Image
          src='https://via.placeholder.com/375x200.png?text=示例图片'
          mode='aspectFill'
          className='media-demo'
        />
        <Video
          src='https://www.w3schools.com/html/mov_bbb.mp4'
          controls
          className='media-demo'
          style={{ display: 'none' }} // 默认隐藏视频
        />
      </View>

      {/* Main Image Area - placeholder for slideshow */}
      <View className='main-image-area'>
        {/* This would be replaced with actual slideshow images */}
      </View>

      {/* Location Info */}
      <View className='location-info enhanced-font'>
        <View className='location-icon-container'>
          <Text className='location-icon'>⦿</Text>
        </View>
        <Text className='location-text'>{travelBlog.destination}</Text>
      </View>

      {/* Blog Title */}
      <View className='blog-title enhanced-font'>
        <Text>{travelBlog.title}</Text>
      </View>

      {/* Travel Details */}
      <View className='travel-details'>
        <View className='detail-item'>
          <Text className='detail-label'>出发时间</Text>
          <Text className='detail-value'>{travelBlog.departureTime}</Text>
        </View>
        <View className='detail-item'>
          <Text className='detail-label'>行程天数</Text>
          <Text className='detail-value'>{travelBlog.duration}</Text>
        </View>
        <View className='detail-item'>
          <Text className='detail-label'>人均花费</Text>
          <Text className='detail-value'>{travelBlog.averageCost}</Text>
        </View>
        <View className='detail-item'>
          <Text className='detail-label'>和谁出行</Text>
          <Text className='detail-value'>{travelBlog.companions}</Text>
        </View>
      </View>

      {/* Blog Content */}
      <View className='blog-content enhanced-font'>
        {travelBlog.content.map((paragraph, index) => (
          <Text key={index} className='content-paragraph'>{paragraph}</Text>
        ))}
      </View>

      {/* Comment Input */}
<View className='bottom-nav'>
  <View className='comment-area'>
    <Input
      className='comment-input'
      placeholder='写下你的评论...'
      value={commentText}
      onInput={(e) => setCommentText(e.detail.value)}
    />
    <Button className='send-btn' onClick={handleComment}>
      发送
    </Button>
  </View>
</View>


    </View>
  )
}

export default TravelBlogDetail