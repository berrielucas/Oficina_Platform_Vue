<script setup>
import { ref } from "vue";
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
    type: String,
    required: false,
  },
});

const nome = ref("");
const email = ref("");
const telefone = ref("");
const endereco = ref("");

const newAutomovel = ref(false);

const editar = () => {
  router.push({ name: "clientId", params: { idClient: props.id } });
  const item = store.users.filter((u) => u.id_cliente === props.id)[0];
  nome.value = item.name;
  email.value = item.email;
  telefone.value = item.email;
  endereco.value = item.email;
  dialog.value = true;
};

const actionUser = () => {
  if (nome.value !== "" && email.value !== "") {
    if (!route.params.idUser) {
      store.addUser({
        id: null,
        name: name.value.trim(),
        email: email.value.trim(),
        dataNasc: dataNasc.value.trim(),
      });
    } else {
      store.editUser({
        id: route.params.idUser,
        name: name.value.trim(),
        email: email.value.trim(),
        dataNasc: dataNasc.value.trim(),
      });
      router.push({ name: "user" });
    }
    dialog.value = false;
    cancelUser();
  }
};

const cancelUser = () => {
  nome.value = "";
  email.value = "";
  telefone.value = "";
  endereco.value = "";
};

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
    full-width
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
        style="z-index: 101"
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
            @click="
              router.push({ name: 'clientes' });
              dialog = false;
            "
            variant="text"
            density="comfortable"
            size="35"
          ></v-btn>
        </v-col>
        <v-form @submit.prevent>
          <v-row dense>
            <v-col cols="8">
              <!-- Dados do Cliente -->
              <v-col cols="12">
                <v-text-field
                  placeholder="Nome *"
                  v-model="nome"
                  :rules="rule"
                  density="comfortable"
                  single-line
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  placeholder="Email *"
                  v-model="email"
                  :rules="rule"
                  density="comfortable"
                  single-line
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  placeholder="Telefone *"
                  v-model="email"
                  :rules="rule"
                  density="comfortable"
                  single-line
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  placeholder="Endereço *"
                  v-model="email"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  no-resize
                ></v-textarea>
              </v-col>

              <!-- Salvar -->
              <v-col cols="12" class="d-flex align-center">
                <v-spacer></v-spacer>
                <v-btn
                  class="text-none"
                  :text="route.params.idUser ? 'Salvar' : 'Cadastrar'"
                  color="#da9c01"
                  @click="actionUser"
                  type="submit"
                  variant="tonal"
                ></v-btn>
              </v-col>
            </v-col>
            <v-divider vertical></v-divider>

            <!-- Dados do Veículo -->
            <v-col cols="4">
              <v-col cols="12" class="py-0">
                <v-switch
                  label="Cadastrar Automóvel"
                  false-icon="mdi-close"
                  true-icon="mdi-car"
                  v-model="newAutomovel"
                  inset
                  color="#da9c01"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="12" v-if="newAutomovel">
                <v-text-field
                  placeholder="Marca *"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Modelo *"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Ano *"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
                <v-text-field
                  placeholder="Placa *"
                  :rules="rule"
                  density="comfortable"
                  single-line
                  class="mb-2"
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
