<script setup>
import { ref } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  hide_details: {
    type: Boolean,
    required: false,
  },
  modelo: {
    type: undefined,
    required: false,
  },
});
const emit = defineEmits({
  date: null,
});
const date = ref(null);
const model_date = ref(null);
const menu = ref(false);
function limparDate(params) {
  emit("date", null);
  date.value = null;
}
function enviarDate() {
  if (
    (model_date.value !== date.value &&
      model_date.value !== null &&
      date.value !== null) ||
    (model_date.value === null && date.value !== null)
  ) {
    model_date.value = date.value;
    emit("date", date.value);
    menu.value = false;
  }
}
if (props.modelo) {
  date.value = new Date(props.modelo);
  model_date.value = new Date(props.modelo);
}
</script>

<template>
  <v-menu
    v-model="menu"
    v-bind:close-on-content-click="false"
    location="bottom left"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="model_date"
        :label="text"
        clearable
        readonly
        :value="
          model_date !== null ? model_date.toLocaleDateString() : undefined
        "
        v-on:update:model-value="model_date === null ? limparDate() : undefined"
        v-bind="props"
        :hide-details="hide_details ? true : false"
      >
      </v-text-field>
    </template>
    <v-date-picker
      color="var(--primary-color)"
      v-model="date"
      hideHeader
      :on-update:model-value="enviarDate()"
      lang="pt"
    ></v-date-picker>
  </v-menu>
</template>
