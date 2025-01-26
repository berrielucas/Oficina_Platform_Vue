import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useOrdemStore = defineStore(
  "ordem",
  () => {
    // Config
    const nameRouter = "ordens";
    const refId = "id_ordem";

    const list = ref([]);

    const load = ref(false);

    const findAll = () => {
      load.value = true;
      axios
        .get(`/${nameRouter}`)
        .then((response) => {
          list.value = response.data;
          load.value = false;
        })
        .catch((error) => {
          console.error(error);
          load.value = false;
        });
    };

    const findOne = (id) => {
      load.value = true;
      axios
        .get(`/${nameRouter}/${id}`)
        .then((response) => {
          const indexOrdem = list.value.findIndex((item) => item[refId] === id_ordem);
          list.value[indexOrdem] = {
            ...list.value[indexOrdem],
            ...response.data,
          };
          load.value = false;
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          load.value = false;
        });
    };

    const create = (data) => {
      axios
        .post(`/${nameRouter}`, data)
        .then((response) => {
          list.value.push(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const update = (data, id) => {
      axios
        .put(`/${nameRouter}/${id}`, data)
        .then((response) => {
          const itemIndex = list.value.findIndex((item) => item[refId] === id);
          list.value[itemIndex] = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const remove = (id) => {
      axios
        .delete(`/${nameRouter}/${id}`)
        .then((response) => {
          const itemIndex = list.value.findIndex((item) => item[refId] === id);
          list.value.splice(itemIndex, 1);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Personalizados

    const addItem = async (data, id_ordem) => {
      load.value = true;
      axios
        .post(`/itens`, data)
        .then((response) => {
          findOne(id_ordem);
        })
        .catch((error) => {
          console.error(error);
          load.value = false;
        });
    };

    const removeItem = async (id_ordem, id_item) => {
      load.value = true;
      axios
        .delete(`/itens/${id_item}`)
        .then((response) => {
          findOne(id_ordem);
          const ordemIndex = list.value.findIndex((ordem) => ordem[refId] === id_ordem);
          const itemIndex = list.value[ordemIndex].itens.findIndex((item) => item.id_item === id_item);
          list.value[ordemIndex].itens.splice(itemIndex, 1);
          load.value = false;
        })
        .catch((error) => {
          console.error(error);
          load.value = false;
        });
    };

    const updateItem = async (data, id_ordem, id_item) => {
      load.value = true;
      axios
        .put(`/itens/${id_item}`, data)
        .then((response) => {
          findOne(id_ordem);
        })
        .catch((error) => {
          console.error(error);
          load.value = false;
        });
    };

    return { list, load, findAll, findOne, create, update, remove, addItem, removeItem, updateItem };
  },
  { persist: true }
);
