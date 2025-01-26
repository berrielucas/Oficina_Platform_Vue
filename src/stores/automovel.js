import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAutomovelStore = defineStore(
  "automovel",
  () => {
    // Config
    const nameRouter = "automoveis";
    const refId = "id_automovel";

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
      axios
        .get(`/${nameRouter}/${id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
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

    return { list, load, findAll, findOne, create, update, remove };
  },
  { persist: true },
);
