import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { lang } from './lang';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import './assets/styles/normalize.css';
import './assets/styles/theme.scss';
import {
  MdAdd,
  RiMore2Fill,
  IoCloseOutline,
  CoCheckCircle,
  RiFileSearchLine,
  OiDatabase,
  BiFolder2Open,
  BiGithub,
  IoSettingsOutline,
  FaRegularUserCircle,
  CoHistory,
  BiHddStackFill,
  CoFolder,
} from 'oh-vue-icons/icons';

const app = createApp(App);
addIcons(
  MdAdd,
  RiMore2Fill,
  IoCloseOutline,
  CoCheckCircle,
  RiFileSearchLine,
  OiDatabase,
  BiFolder2Open,
  BiGithub,
  IoSettingsOutline,
  FaRegularUserCircle,
  CoHistory,
  BiHddStackFill,
  CoFolder,
);
app.component('VIcon', OhVueIcon);

app.use(router);
app.use(store);
app.use(lang);

app.mount('#app');
