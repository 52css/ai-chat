<script setup lang="ts">
import { ref } from 'vue'
import useVisualViewport from '@/utils/use-visual-viewport'
const {height} = useVisualViewport({
    height: 0,
    tapSelector: '.input', // 可点击区域
    yScrollSelector: '.message', // 纵向滚动条
    xScrollSelector: '.tip' // 横向滚动条
})

const messageList = ref([
  {
    type: 'system',
    content: '你好，我是小助手，有什么可以帮到你的吗？'
  },
  {
    type: 'user',
    content: '你好'
  },
])

const tipList = ref([
  {
    type: 'system',
    content: '讲个笑话'
  },
])

</script>

<template>
  <view class="container" :style="{'--margin-top': '0px'}">
    <view class="girl"></view>
    <scroll-view class="message" scroll-y>
      <view class="message__list">
        <view v-for="(msg) in messageList" class="message__item" :data-type="msg.type">
          <div class="message__content">
            {{ msg.content }}
          </div>
        </view>
      </view>
    </scroll-view>
    <scroll-view class="tip" scroll-x>
      <view class="tip__list">
        <view v-for="(tip) in tipList" class="tip__item">
          <div class="tip__content">
            {{ tip.content }}
          </div>
        </view>
      </view>
    </scroll-view>
    <input class="input" placeholder="来和晓晓聊聊天吧" placeholder-class="placeholder"/>
  </view>
</template>

<style>
uni-page-body {
  height: 100%;
}
.container {
  margin-top: var(--margin-top);
  height: calc(100vh - var(--margin-top));
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#2A104F, #54185E);
}
.girl {
  background: url(/static/char.png) bottom center no-repeat;
  width: 285rpx;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 260rpx;
  background-size: 100%;
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

.tip {

}
.tip__list {
  padding: 0 40rpx;
  margin-bottom: 20rpx;
  display: flex;
  gap: 20rpx;
}
.tip__item {
  background-color: #352B5A;
  padding: 16rpx 30rpx;
  color: #fff;
  border-radius: 40rpx;
}

.input {
  position: relative;
  height: 100rpx;
  margin: 0 40rpx 40rpx;
  padding: 0 40rpx;
  border-radius: 50rpx;
  background: linear-gradient(45deg, #16355ac8 0%, #52254b9a 100%);
  color: #fff;
}
.input::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50rpx;
  padding: 6rpx;
  background:linear-gradient(45deg,#5BA8D2,#FE82AF);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.placeholder {
  background-image: linear-gradient(to right, #5BA8D2, #B877E8, #FE82AF);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 30rpx;
  font-weight: 600;
  width: 327rpx;
}
</style>
