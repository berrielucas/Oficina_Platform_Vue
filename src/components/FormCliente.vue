<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClientStore } from "@/stores/client";

const store = useClientStore();
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
const nameRouter = "clientes";
const refId = "id_cliente";

let dataObject = reactive({
  nome: "",
  email: "",
  telefone: "",
  endereco: ""
})


// Functions
const editar = () => {
  router.push({ name: `${nameRouter}Id`, params: { id: props.id } });
  const item = store.list.find((i) => i[refId] === props.id);
  if (item) {
    dataObject = {
      ...dataObject,
      ...item
    }
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
    dataObject[key] = "";
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
        text="Novo cliente"
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
          <h3>{{ props.edit ? "Cliente" : "Novo cliente" }}</h3>
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
                <v-text-field
                  placeholder="Nome *"
                  v-model="dataObject.nome"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Email *"
                  v-model="dataObject.email"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Telefone *"
                  v-model="dataObject.telefone"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-textarea
                  placeholder="Endereço *"
                  v-model="dataObject.endereco"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  no-resize
                  rows="2"
                  class="mb-2"
                ></v-textarea>
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
