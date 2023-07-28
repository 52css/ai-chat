<script setup lang="ts">
import { ref } from 'vue'
const messageList = ref([
  {
    type: 'system',
    content: '你好，我是小助手，有什么可以帮到你的吗？'
  },
  {
    type: 'user',
    content: '哈哈哈哈哈'
  }
])
</script>

<template>
  <view class="container">
    <view class="girl"></view>
    <view class="message">
      <view class="message__list">
        <view v-for="(msg) in messageList" class="message__item" :data-type="msg.type">
          <div class="message__content">
            {{ msg.content }}
          </div>
        </view>
      </view>
    </view>
    <input class="input" placeholder="有困难？试着问问我吧!" />
  </view>
</template>

<style>
uni-page-body {
  height: 100%;
}
.container {
  height: 100%;
  background: url('/static/bg.png');
  background-size: contain;
  position: relative;
  display: flex;
  flex-direction: column;
}
.message {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: flex-end;
}
.message__list {
  width: 460rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  background: linear-gradient(144deg, #FFFFFF 0%, #F7DCC5 100%);
}
.message__item[data-type="user"] {
  justify-content: end;
}
.message__item[data-type="user"] .message__content {
  background: linear-gradient(139deg, #FFA426 0%, #F7DCC5 100%);
  border-radius: 40rpx 40rpx 8rpx 40rpx;
  color: #FFFFFF;
}
.input {
  height: 100rpx;
  background: linear-gradient(129deg, #DB9E52 0%, #EAC38F 100%);
  border-radius: 50rpx;
  opacity: 0.5;
  border: 1rpx solid #FFFFFF;
  margin: 0 40rpx 112rpx;
  padding: 0 40rpx;
  font-size: 32rpx;
  color: #955709;
}
</style>
