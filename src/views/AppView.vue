<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

import { useClientStore } from "@/stores/client";
const storeCliente = useClientStore();

const router = useRouter();

onBeforeMount(() => {
  if (!authStore.auth) {
    router.push("/login");
  }
});

onMounted(() => {
  storeCliente.findAll()
})

/**
 * App Bar
 */
const searchText = ref("");
const searchToggle = ref(false);
const appBarExtendToggle = ref(false);

const activeSearch = () => {
  searchToggle.value = true;
};

const deactiveSearch = () => {
  searchToggle.value = false;
  searchText.value = "";
};

const enterSearch = () => {
  if (searchText.value) {
    chipSearchText.value = searchText.value;
    searchText.value = "";
    chipSearchToggle.value = true;
    searchToggle.value = false;
  }
};

/**
 * Navigation
 */
const groupItens = ref([
  {
    title: "Principal",
    name: "MAIN",
    children: [
      {
        title: "Ordens de Serviço",
        path: "ordens",
        icon: "mdi-file-document-check",
      },
    ],
  },
  {
    title: "Cadastros",
    name: "CAD",
    children: [
      {
        title: "Automóveis",
        path: "automoveis",
        icon: "mdi-car",
      },
      {
        title: "Clientes",
        path: "clientes",
        icon: "mdi-account-group",
      },
      {
        title: "Serviços",
        path: "servicos",
        icon: "mdi-tools",
      },
    ],
  },
]);

const groupOpened = ref(["MAIN", "CAD"]);
</script>

<template>
  <v-app theme="dark">
    <v-navigation-drawer permanent color="transparent" width="230">
      <v-list :opened="groupOpened">
        <v-list-group
          v-for="(group, index) in groupItens"
          :key="index"
          :value="group.name"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              density="compact"
              active
              color="#da9c01"
              v-bind="props"
            >
              <span class="nav-section">{{ group.title }}</span>
            </v-list-item>
          </template>

          <v-list-item
            v-for="(item, index) in group.children"
            :key="index"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="$router.push({ name: item.path })"
            density="comfortable"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="border-b" color="#121212" density="compact" flat>
      <v-app-bar-title>
        <p class="bar-title">{{ $route.meta.title }}</p>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <div
          :class="
            searchToggle ? (appBarExtendToggle ? 'border-s border-b' : '') : ''
          "
          class="h-100 d-flex rounded-xl search-section"
          style="align-items: center; justify-content: center"
        >
          <input
            v-model="searchText"
            @click="activeSearch"
            @focusout="deactiveSearch"
            :class="searchToggle ? 'search-active' : ''"
            class="search-input ml-5"
            type="text"
            placeholder="Bucar aqui..."
          />
          <!-- <v-chip v-if="chipSearchToggle" class="ml-auto mr-0" closable close-icon="mdi-close">{{ chipSearchText }}</v-chip> -->
          <v-icon @click="" class="mr-3 ml-4">mdi-magnify</v-icon>
        </div>
      </template>

      <!-- Dev Tools -->
      <template v-if="false" v-slot:extension>
        <div class="d-fborder-t w-100 h-100">
          <p>teste</p>
          <v-spacer></v-spacer>
          <v-chip-group column multiple>
            <v-chip
              density="comfortable"
              text="Arovadas"
              variant="outlined"
              filter
            ></v-chip>
          </v-chip-group>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.bar-title {
  font-size: large;
}

:deep(.v-list-group) {
  --list-indent-size: 0px !important;
  --prepend-width: 0px !important;
}

:deep(.v-list-item__prepend) {
  display: inline-grid;
  margin-inline-end: 0.8rem !important;

  --prepend-width: 0px !important;
}

.nav-section {
  font-size: 14px;
}

.search-input {
  outline: none;
  transition: all 0.3s ease-in-out;
  transform: translateX(110%);
  opacity: 0;
  z-index: 100;
  cursor: pointer;
}

.search-active {
  transform: translateX(0%);
  opacity: 1;
  cursor: text;
}

.search-section {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.3s;
  margin: auto;
}
</style>
