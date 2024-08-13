import {createApp} from "vue";
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from "./router";
import store from './store';
import directive from './directive';
import App from "./App.vue";
import Logger from '@/utils/Logger'
import globalComponents from '@/views/components';
import '@arco-design/web-vue/dist/arco.less';
import '@/assets/style/global.less';
import '@/api/interceptor';
import './mock';

const setupAll = async () => {
const app = createApp(App)
    app.use(ArcoVue, {});
    app.use(ArcoVueIcon);
    app.use(router);
    app.use(store);
    app.use(globalComponents);
    app.use(directive);
    app.mount("#app");
};
setupAll()
Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE)