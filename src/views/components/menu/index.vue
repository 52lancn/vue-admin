<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue';
  import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';
  import type { RouteMeta } from 'vue-router';
  import { useAppStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { openWindow, regexUrl } from '@/utils';
  import useMenuTree from './use-menu-tree';

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore();
      const router = useRouter();
      const route = useRoute();
      const { menuTree } = useMenuTree();
      // const collapsed = computed({
      //   get() {
      //     if (appStore.device === 'desktop') return appStore.menuCollapse;
      //     return false;
      //   },
      //   set(value: boolean) {
      //     appStore.updateSettings({ menuCollapse: value });
      //   },
      // });
      // const topMenu = computed(() => appStore.topMenu);
      const openKeys = ref<string[]>([]);
      const selectedKey = ref<string[]>([]);

      const goto = (item: RouteRecordRaw) => {
        // Open external link
        if (regexUrl.test(item.path)) {
          openWindow(item.path);
          selectedKey.value = [item.name as string];
          return;
        }
        // Eliminate external link side effects
        const { hideInMenu, activeMenu } = item.meta as RouteMeta;
        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKey.value = [item.name as string];
          return;
        }
        // Trigger router change
        router.push({
          name: item.name,
        });
      };
      const findMenuOpenKeys = (target: string) => {
        const result: string[] = [];
        let isFind = false;
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (item.name === target) {
            isFind = true;
            result.push(...keys);
            return;
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys, el.name as string]);
            });
          }
        };
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return; // Performance optimization
          backtrack(el, [el.name as string]);
        });
        return result;
      };
      listenerRouteChange((newRoute) => {
        const { requiresAuth, hideInMenu } = newRoute.meta;
        if (requiresAuth && (!hideInMenu || newRoute.name == 'Workplace')) {
          const menuOpenKeys = findMenuOpenKeys(newRoute.name as string);
          const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
          openKeys.value = [...keySet];
          selectedKey.value = [menuOpenKeys[menuOpenKeys.length - 1]];
          if(selectedKey.value.length)
          {
            selectedKey.value=['Workplace'];
          }
          console.log("listenerRouteChange",newRoute.name);
          console.log("selectedKey",selectedKey.value);
        }
      }, true);
      // const setCollapse = (val: boolean) => {
      //   if (appStore.device === 'desktop')
      //     appStore.updateSettings({ menuCollapse: val });
      // };

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // This is demo, modify nodes as needed
              const icon = element?.meta?.icon
                ? () => h(compile(`<${element?.meta?.icon}/>`))
                : null;
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    key={element?.name}
                    title= {element?.meta?.activeMenu}
                    v-slots={{
                      icon
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    { element?.meta?.activeMenu }
                  </a-menu-item>
                );
              nodes.push(node as never);
            });
          }
          return nodes;
        }
        return travel(menuTree.value);
      };
      //console.log("selectedKey",selectedKey.value);
      return () => (
        <a-menu
          v-model:open-keys={openKeys.value}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          default-selected-keys={['Workplace']}
          level-indent={34}
          style="height: 100%;width:100%;"
          //onCollapse={setCollapse}
          accordion={true}
        >
          <a-menu-item
            class="arco-menu-item-workplace"
            key={'Workplace'}
            v-slots={{ icon: () => h(compile(`<icon-home />`)) }}
            onClick={() => goto({
              path: '/dashboard/workplace',
              name: 'Workplace',
              component: () => import('@/views/dashboard/workplace/index.vue'),
              meta: {
                requiresAuth: true,
              },
            })}
          >      
          概览
          </a-menu-item>
          {renderSubMenu()}
        </a-menu>
      );
    },
  });
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header,
    .arco-menu-item.arco-menu-item-workplace {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: var(--color-white);
      .arco-icon {
        color: var(--color-white);
      }
    }
    .arco-menu-inline-header:hover,
    .arco-menu-item-workplace:hover,
    .arco-menu-item:hover,
    .arco-menu-item.arco-menu-selected {
      color: #0baf4d;
      background-color: #1f2328;
      .arco-icon {
        color: #0baf4d;
      }
    }
    .arco-menu-inline-header.arco-menu-selected,
    .arco-menu-item-workplace.arco-menu-selected  {
      background-color:  #0baf4d;
    }
    .arco-menu-inline-header.arco-menu-selected:hover,
    .arco-menu-item-workplace.arco-menu-selected:hover,
    .arco-menu-item-workplace.arco-menu-selected  {
      color: var(--color-white);
      .arco-icon {
        color: var(--color-white);
      }
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }





</style>
