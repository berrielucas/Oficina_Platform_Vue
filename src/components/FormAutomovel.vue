<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClientStore } from "@/stores/client";
import { useAutomovelStore } from "@/stores/automovel";

const store = useAutomovelStore();
const storeCliente = useClientStore();
const route = useRoute();
const router = useRouter();
const dialog = ref(false);

const props = defineProps({
  edit: {
    type: Boolean,
    required: false,
  },
  id: {
    type: Number,
    required: false,
  },
});


// Configs
const nameRouter = "automoveis";
const refId = "id_automovel";

let dataObject = reactive({
  id_cliente: null,
  marca: "",
  modelo: "",
  ano: "",
  placa: ""
})


// Functions
const editar = () => {
  router.push({ name: `${nameRouter}Id`, params: { id: props.id } });
  const item = store.list.find((i) => i[refId] === props.id);
  if (item) {
    dataObject = reactive({
      ...dataObject,
      ...item
    })
  }
};

const action = () => {
  if (valid(dataObject)) {
    if (!route.params.id) {
      store.create(dataObject);
    } else {
      store.update(dataObject, props.id);
      router.push({ name: nameRouter });
    }
    dialog.value = false;
    cancel();
  }
};

const cancel = () => {
  for (const key in dataObject) {
    if (typeof dataObject[key] == "string") {
      dataObject[key] = "";
    } else {
      dataObject[key] = null;
    }
  }
};

const close = () => {
  router.push({ name: nameRouter });
  dialog.value = false;
}

const valid = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
    if (!obj[key]) {
      return false;
    }
  }
  return true;
}

const rule = ref([
  (value) => {
    if (value) return true;
    return "Campo obrigatório";
  },
]);
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="!props.edit"
        v-bind="activatorProps"
        class="text-none"
        text="Novo veículo"
        color="#da9c01"
        @click="dialog = true"
        variant="tonal"
        style="z-index: 150"
      ></v-btn>
      <v-btn
        v-else
        v-bind="activatorProps"
        @click="editar"
        icon="mdi-pencil"
        density="comfortable"
        class="rounded-lg"
        size="40"
        color="white"
        variant="text"
      ></v-btn>
    </template>
    <v-card>
      <v-card-text class="px-3 pb-4 pt-1">
        <v-col cols="12" class="mb-2 pr-1 d-flex align-center">
          <h3>{{ props.edit ? "Veículo" : "Novo veículo" }}</h3>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none rounded-lg"
            icon="mdi-close"
            color="red"
            @click="close"
            variant="text"
            density="comfortable"
            size="35"
          ></v-btn>
        </v-col>
        <v-form @submit.prevent>
          <v-row dense>
              <!-- Dados do Cliente -->
              <v-col cols="12">
                <v-autocomplete
                    v-model="dataObject.id_cliente"
                    :items="storeCliente.list"
                    item-title="nome"
                    item-value="id_cliente"
                    placeholder="Cliente *"
                    single-line
                    class="mb-2"
                    closable
                    density="comfortable"
                ></v-autocomplete>
                <v-text-field
                  placeholder="Marca *"
                  v-model="dataObject.marca"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Modelo *"
                  v-model="dataObject.modelo"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Ano *"
                  v-model="dataObject.ano"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Placa *"
                  v-model="dataObject.placa"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
              </v-col>

              <!-- Salvar -->
              <v-col cols="12" class="d-flex align-center">
                <v-spacer></v-spacer>
                <v-btn
                  class="text-none"
                  :text="route.params.id ? 'Salvar' : 'Cadastrar'"
                  color="#da9c01"
                  @click="action"
                  type="submit"
                  variant="tonal"
                ></v-btn>
              </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
