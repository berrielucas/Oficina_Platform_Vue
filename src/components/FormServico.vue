<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useServicoStore } from "@/stores/servico";
import { useGlobalStore } from "@/stores/global";

const { formatMoeda } = useGlobalStore();
const store = useServicoStore();
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
const nameRouter = "servicos";
const refId = "id_servico";

let dataObject = reactive({
  descricao: "",
  preco: 0.00,
})

// Personalizados
const displayedMoney = ref("R$ 0,00");

const formatMoney = computed(() => {
  const { preco, display } = formatMoeda(displayedMoney.value);
  dataObject.preco = preco;
  displayedMoney.value = display;
});


// Functions
const editar = () => {
  router.push({ name: `${nameRouter}Id`, params: { id: props.id } });
  const item = store.list.find((i) => i[refId] === props.id);
  if (item) {
    dataObject = reactive({
      ...dataObject,
      ...item
    })
    // Personalização
    displayedMoney.value = `R$ `+`${dataObject.preco}`.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    if (typeof dataObject[key] == "number") {
      dataObject[key] = 0.00;
    } else {
      dataObject[key] = "";
    }
  }
  displayedMoney.value = "R$ 0,00";
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
    // Personalizado
    if (parseInt(obj[key]) === 0) {
      return false;
    }
  }
  return true;
}

const rule = ref([
  (value) => {
    // Personalizado
    if (parseInt(value.replace("R$ ", "").replace(",", ".")) === 0) {
      return "Valor mínimmo R$ 1,00"
    } else

    // Padrão
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
        text="Novo serviço"
        color="var(--primary-color)"
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
          <h3>{{ props.edit ? "Serviço" : "Novo serviço" }}</h3>
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
                  placeholder="Descricao *"
                  v-model="dataObject.descricao"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  label="Preço *"
                  v-model="displayedMoney"
                  v-model:update="formatMoney"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                  maxlength="16"
                ></v-text-field>
              </v-col>

              <!-- Salvar -->
              <v-col cols="12" class="d-flex align-center">
                <v-spacer></v-spacer>
                <v-btn
                  class="text-none"
                  :text="route.params.id ? 'Salvar' : 'Cadastrar'"
                  color="var(--primary-color)"
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
