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
  RiFileSearchLine,
  OiDatabase,
  BiFolder2Open,
  BiGithub,
  CoSettings,
  FaRegularUserCircle,
  CoHistory,
  CoFolder,
  BiCheckLg,
  GiHouseKeys,
  FaTerminal,
  MdMorehoriz,
  HiSolidPlus,
} from 'oh-vue-icons/icons';

const app = createApp(App);
addIcons(
  MdAdd,
  RiMore2Fill,
  IoCloseOutline,
  BiCheckLg,
  RiFileSearchLine,
  OiDatabase,
  BiFolder2Open,
  BiGithub,
  CoSettings,
  FaRegularUserCircle,
  CoHistory,
  CoFolder,
  GiHouseKeys,
  FaTerminal,
  MdMorehoriz,
  HiSolidPlus,
);
app.component('VIcon', OhVueIcon);

app.use(router);
app.use(store);
app.use(lang);

app.mount('#app');
