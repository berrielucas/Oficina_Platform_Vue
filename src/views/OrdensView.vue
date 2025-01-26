<script setup>
import FormCliente from "@/components/FormCliente.vue";

import { useOrdemStore } from "@/stores/ordens";
import { computed, reactive, ref } from "vue";
const store = useOrdemStore();

// Config
const refId = ref("id_ordem");

const page = ref(1);
const itemsPerPage = ref(10);
const pageCount = computed(() => {
  return Math.ceil(store.list.length / itemsPerPage.value);
});
const config = reactive({
  headers: [
    {
      align: "start",
      key: "status",
      title: "Status",
    },
    // { title: "Email", key: "email" },
    // { title: "Celular", key: "telefone" },
    { title: "Ações", key: "action", align: "end", sortable: false },
  ],
});

</script>

<template>
  <div class="pa-5">
    <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn
            @click="store.findAll()"
            icon="mdi-sync"
            density="comfortable"
            class="mx-3"
            size="37"
            color="white"
            variant="tonal"
          ></v-btn>
        <!-- <FormCliente :edit="false" /> -->
    </div>
    <v-data-table
        v-model:page="page"
        :headers="config.headers"
        :items="store.list"
        :items-per-page="itemsPerPage"
        fixed-header
        style="font-size: 16px; background-color: transparent;"
        :hover="store.list.length > 0"
        density="comfortable"
        class="mt-4 border w-100"
        :loading="store.load"
      >
        <template v-slot:no-data>
          <div class="py-10">
            <h3 class="font-weight-medium opacity-80">Nenhuma ordem encontrada na base.</h3>
          </div>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader style="background-color: transparent;" class="py-3" type="table-row@3"></v-skeleton-loader>
        </template>

        <template v-slot:item.action="{ item }">
          <!-- <FormCliente :edit="true" :id="item[refId]" /> -->
          <v-btn
            @click="store.remove(item[refId])"
            icon="mdi-trash-can"
            density="comfortable"
            class="rounded-lg"
            size="40"
            color="red"
            variant="text"
          ></v-btn>
        </template>

        <template v-slot:bottom>
          <div class="pb-1 pt-2" v-if="store.list.length > itemsPerPage && !store.load">
            <v-pagination
              density="comfortable"
              style="max-width: 700px; margin-inline: auto"
              v-model="page"
              :length="pageCount"
            ></v-pagination>
          </div>
        </template>
      </v-data-table>
  </div>
</template>