<template>  
      <a-layout>
        <a-layout-header>
          <NavBar />
        </a-layout-header>
        <a-layout-sider theme="dark" :width="180">
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
          <a-layout-content>
            <PageLayout />
          </a-layout-content>
      </a-layout>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter, useRoute, RouterView } from 'vue-router';
  import { useUserStore } from '@/store';
  import NavBar from '../components/navbar/index.vue';
  import Menu from '../components/menu/index.vue';

  import usePermission from '@/hooks/permission';
  // import useResponsive from '@/hooks/responsive';
  import PageLayout from './page-layout.vue';

  const isInit = ref(false);
  // const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const permission = usePermission();
  // useResponsive(true);
  // const navbarHeight = `60px`;
  // const navbar = computed(() => appStore.navbar);
  // const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
  // const hideMenu = computed(() => appStore.hideMenu);
  // const footer = computed(() => appStore.footer);
  // const menuWidth = computed(() => {
  //   return appStore.menuCollapse ? 48 : appStore.menuWidth;
  // });
  // const collapsed = computed(() => {
  //   return appStore.menuCollapse;
  // });
  // const paddingStyle = computed(() => {
  //   const paddingLeft =
  //     renderMenu.value && !hideMenu.value
  //       ? { paddingLeft: `${menuWidth.value}px` }
  //       : {};
  //   const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
  //   return { ...paddingLeft, ...paddingTop };
  // });
  // const setCollapsed = (val: boolean) => {
  //   if (!isInit.value) return; // for page initialization menu state problem
  //   appStore.updateSettings({ menuCollapse: val });
  // };
  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route))
        router.push({ name: 'notFound' });
    }
  );
  // const drawerVisible = ref(false);
  // const drawerCancel = () => {
  //   drawerVisible.value = false;
  // };
  // provide('toggleDrawerMenu', () => {
  //   drawerVisible.value = !drawerVisible.value;
  // });
  // onMounted(() => {
  //   isInit.value = true;
  // });


</script>
<style lang="less">
.arco-layout{
  height: 100%;
  width: 100%;
  &-header{
      height: 66px;
      background-color: #fff;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.03);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
  }
  &-sider{
    width: 180px;
    height: 100%;
    background-color: #1f2328;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    padding: 66px 0 0 0;
    .menu-wrapper{
      padding: 10px 0 0 0;
    }
  }
  &-content{
    background-color: #edf0f2;
    overflow-y: hidden;
    padding: 66px 0 0 180px;
    min-height: 100vh;
  }
}

</style>