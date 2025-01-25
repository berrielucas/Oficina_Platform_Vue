// Config CSS
import "./assets/main.css";

// Config Axios
import "./plugins/axios";

// Config Vue and Router
import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";

// Config Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

// Config Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Config App
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
