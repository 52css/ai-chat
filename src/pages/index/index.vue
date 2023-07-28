<script setup lang="ts">
import { ref } from 'vue'
import useVisualViewport from '@/utils/use-visual-viewport'
const {height} = useVisualViewport({
    height: 0,
    tapSelector: '.input', // 可点击区域
    yScrollSelector: '.message', // 纵向滚动条
    // xScrollSelector: '.chat-opywriting' // 横向滚动条
})

const messageList = ref([
  {
    type: 'system',
    content: '你好，我是小助手，有什么可以帮到你的吗？'
  },
  {
    type: 'user',
    content: '哈哈哈哈哈'
  },
])

</script>

<template>
  <view class="container">
    <view class="girl"></view>
    <view :style="{height: height + 'px'}"/>
    <scroll-view class="message" scroll-y>
      {{ height }}
      <view class="message__list">
        <view v-for="(msg) in messageList" class="message__item" :data-type="msg.type">
          <div class="message__content">
            {{ msg.content }}
          </div>
        </view>
      </view>
    </scroll-view>
    <input class="input" placeholder="有困难？试着问问我吧!" />
  </view>
</template>

<style>
uni-page-body {
  height: 100%;
}
.container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#2A104F, #54185E);
  /* background: url('/static/bg.png'); */
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
}
.message {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: flex-end;
  overflow: auto;
}
.message__list {
  width: 460rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  margin: 0 0 0 auto;
}
.message__item {
  margin-top: 40rpx;
  display: flex;
}
.message__content {
  display: inline-flex;
  border-radius: 8rpx 40rpx 40rpx 40rpx;
  opacity: 0.95;
  padding: 20rpx;
  max-width: 460rpx;
  font-size: 28rpx;
  color: #333333;
}
.message__item[data-type="system"] .message__content {
  background: #403474;
  color: #fff;
}
.message__item[data-type="user"] {
  justify-content: end;
}
.message__item[data-type="user"] .message__content {
  background: #4A5ED4;
  border-radius: 40rpx 40rpx 8rpx 40rpx;
  color: #FFFFFF;
}
.input {
  height: 100rpx;
  background: linear-gradient(129deg, #DB9E52 0%, #EAC38F 100%);
  border-radius: 50rpx;
  opacity: 0.5;
  border: 1rpx solid #FFFFFF;
  margin: 0 40rpx 40rpx;
  padding: 0 40rpx;
  font-size: 32rpx;
  color: #955709;
}
</style>
