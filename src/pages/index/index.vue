<script setup lang="ts">
import { ref, getCurrentInstance, nextTick } from 'vue'
import Api2d from 'api2d';
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
  // {
  //   type: 'user',
  //   content: '你好'
  // },
])

const tipList = ref([
  {
    type: 'system',
    content: '讲个笑话'
  },
  {
    type: 'system',
    content: '音乐推荐'
  },
])
const loading = ref(false)
const instance = getCurrentInstance()
const scrollTop = ref(0)
const scrollToBottom = () => {
  const query = uni.createSelectorQuery().in(instance);
  let nodesRef = query.select('.message__list');
  nodesRef
    .boundingClientRect((res: any) => {
      nextTick(() => {
        //进入页面滚动到底部
        scrollTop.value = res.height + 100;
      });
    })
    .exec();
}
const api = new Api2d('fk211166-MyLi1GKk3wYQoIMlsN3KMMmqtvr19HZW', 'https://openai.api2d.net/');
const handleChat = async (content: string) => {
  if (loading.value) return
  loading.value = true
  console.log('开始聊天', content)
  messageList.value.push({
    type: 'user',
    content,
  })
  messageList.value.push({
    type: 'system',
    content: '...',
  })
  const ret = await api.completion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    stream: true, // Supports streaming, note that when stream is true, the return value is undefined
    onMessage: (string) => {
      // console.log('SSE returned, the complete string received is:', string);
      messageList.value[messageList.value.length - 1].content = string + '...';
      scrollToBottom()
    },
    onEnd: (string) => {
      // console.log('end', string);
      messageList.value[messageList.value.length - 1].content = string;
      scrollToBottom()
      loading.value = false
    },
  });

  console.log('ret', ret);
}

const input = ref('')
const handleConfirm = async () => {
  if (!input.value) return
  await handleChat(input.value)
  input.value = ''
}

</script>

<template>
  <view class="container">
    <view :style="{height: height + 'px'}"></view> <!-- 占位符 -->
    <view class="girl"></view>
    <scroll-view class="message" scroll-y scroll-with-animation :scroll-top="scrollTop">
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
        <view v-for="(tip, tipIndex) in tipList" :key="tipIndex" class="tip__item" @tap="handleChat(tip.content)">
          <div class="tip__content">
            {{ tip.content }}
          </div>
        </view>
      </view>
    </scroll-view>
    <input v-model="input" @confirm="handleConfirm" class="input" :disabled="loading" placeholder="来和晓晓聊聊天吧" placeholder-class="placeholder"/>
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
  transition: all 0.3s;
}
.girl {
  background: url(./char.png) bottom center no-repeat;
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
  padding: 40rpx 40rpx 0;
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
  white-space: break-spaces;
}
.message__item[data-type="system"] .message__content {
  background: #403474d6;
  color: #fff;
}
.message__item[data-type="user"] {
  justify-content: end;
}
.message__item[data-type="user"] .message__content {
  background: #4a5fd4c4;
  border-radius: 40rpx 40rpx 8rpx 40rpx;
  color: #FFFFFF;
}

.tip {

}
.tip__list {
  padding: 0 40rpx;
  margin: 20rpx 0;
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
