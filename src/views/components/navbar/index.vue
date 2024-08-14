<template>
  <div class="navbar">
    <div class="left-side">
      <h1 class="logo">52lancn.</h1>
    </div>
    <div class="right-side">
      <a-space class="right-side-space">
        <a-tooltip content="https://github.com/52lancn/vue-admin">
          <a-link class="nav-btn" target="_blank" href="https://github.com/52lancn/vue-admin">
            <template #icon>
              <icon-github />
            </template>
          </a-link>
        </a-tooltip>    
        <a-tooltip content="语言">
          <a-button 
          class="nav-btn" 
          type="outline" 
          :shape="'circle'"
          @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
        <a-tooltip content="消息通知">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button
                class="nav-btn"
                type="outline"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
        <a-tooltip
          :content="
            isFullscreen
              ? '点击退出全屏模式'
              : '点击切换全屏模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click">
          <a-avatar
            :size="40"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space>
                <icon-tag />
                <span>
                  切换角色
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space>
                <icon-user />
                <span>
                  用户中心
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space>
                <icon-settings />
                <span>
                  用户设置
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  登出登录
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref , computed} from 'vue';
  import { useFullscreen } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useUser from '@/hooks/user';
  import MessageBox from '../message-box/index.vue';
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
  const userStore = useUserStore();
  const avatar = computed(() => {
    return userStore.avatar;
  });
  const locales = [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
  ];
  const currentLocale = 'zh-CN';
  const triggerBtn = ref();
  const handleGoToUrl = (url:string) => {
      window.location.href = url;
  }
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
  // const theme =  ref('dark');
  // const handleToggleTheme = () => {
  //   theme.value =  theme.value == 'dark'? 'light' : 'dark';
  // };
  const refBtn = ref();
  const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    refBtn.value.dispatchEvent(event);
  };
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
  };
</script>

<style scoped lang="less">
  .navbar{
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      height: 100%;
  }

 .left-side{
    width: 180px;
    flex-basis: 180px;
    flex-shrink: 0;
    background-color: #1f2328;
    text-align: center;
    .logo{
      white-space: nowrap;
      color: #07bb8a; /* 文字颜色 */
      text-shadow: 
        0 0 1px #07bb8a, /* 光滑 */
        0 0 8px #07bb8a, /* 光滑 */
        0 0 58px #07bb8a, /* 光滑 */
        0 0 88px #000; /* 边缘阴影 */
      font-style: italic;
    }
  }

 .right-side{
    padding:0 20px;
    &-space{
      height: 100%;
    }

    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
 }

 .arco-link.nav-btn{
    width: 32px;
    height: 32px;
    padding: 0;
    text-align: center;
    border-radius: var(--border-radius-circle);

    background-color: transparent;
    border: 1px solid rgb(var(--primary-6));

    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
 }
 :deep(.arco-link-icon) {
    margin-right: 0px;
    font-size: 16px;
  }
</style>

