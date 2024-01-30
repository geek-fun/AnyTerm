<template>
  <div class="left-aside">
    <div class="main-nav">
      <the-aside-icon
        v-for="item in mainNavList"
        :key="item.path"
        :popover-content="$t(`aside.${item.name}`)"
      >
        <div
          class="icon-item"
          :class="{
            active: isActive(item),
          }"
          @click="navClick(item)"
        >
          <n-icon size="26"> <v-icon :name="item.icon" /> </n-icon>
        </div>
      </the-aside-icon>
    </div>
    <div class="samll-nav">
      <the-aside-icon
        v-for="item in samllNavList"
        :key="item.path"
        :popover-content="$t(`aside.${item.name}`)"
      >
        <div
          class="icon-item"
          :class="{
            active: isActive(item),
          }"
          @click="navClick(item)"
        >
          <n-icon size="26"> <v-icon :name="item.icon" /> </n-icon>
        </div>
      </the-aside-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/shell';
import { useAppStore } from '../../store';
import theAsideIcon from './the-aside-icon.vue';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

const mainNavList = ref([
  {
    id: 'connect',
    path: '/connect',
    name: 'connect',
    icon: 'bi-hdd-stack-fill',
    isLink: false,
  },
  {
    id: 'file',
    path: '/',
    name: 'file',
    icon: 'co-folder',
    isLink: false,
  },
  {
    id: 'secret',
    path: '/secret',
    name: 'Secret',
    icon: 'gi-house-keys',
    isLink: false,
  },
  {
    id: 'history',
    path: '/history',
    name: 'history',
    icon: 'co-history',
    isLink: false,
  },
  {
    id: 'github',
    path: '',
    name: 'github',
    icon: 'bi-github',
    isLink: true,
  },
]);

const samllNavList = ref([
  {
    path: '/',
    id: 'user',
    icon: 'fa-regular-user-circle',
    name: 'user',
    isLink: false,
  },
  {
    path: '/setting',
    id: 'setting',
    icon: 'co-settings',
    name: 'setting',
    isLink: false,
  },
]);

interface RouteItem {
  path: string;
  id: string;
  icon: string;
  name: string;
  isLink: boolean;
}
const isActive = (item: RouteItem) => {
  return item.path === route.path;
};
// nav click handler method
const navClick = (item: RouteItem) => {
  if (item.isLink && item.id === 'github') {
    open('https://github.com/geek-fun/AnyTerm');
  } else {
    if (route.path === item.path) {
      appStore.setConnectPannel();
    } else {
      router.push({
        path: item.path,
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.left-aside {
  --aside-width: 60px;
  width: var(--aside-width);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  .main-nav {
    flex: 1;
    height: 0;
  }
  .icon-item {
    height: var(--aside-width);
    height: 40px;
    margin: 10px 0;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    cursor: pointer;
    .n-icon {
      opacity: 0.4;
      transition: 0.3s;
    }
    &.active {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 5px;
        background-color: var(--border-color);
      }
      .n-icon {
        opacity: 1;
      }
    }
    &:hover {
      .n-icon {
        opacity: 0.9;
      }
    }
  }
}
</style>
