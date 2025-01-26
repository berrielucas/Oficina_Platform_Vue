import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useGlobalStore = defineStore("global", () => {
  // Ambiente
  const message = ref("");
  const colorAlert = ref("");
  const popupAlert = ref(false);
  const timeOutAlert = ref(2000);

  const formatPhone = (p) => {
    const phone = p.replace(/\D/g, "");
    if (phone.length <= 8) {
      return phone.replace(/(\d{4})(\d{4})/, "$1-$2");
    } else if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const formatCPF = (c) => {
    const cpf = c.replace(/\D/g, "");
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

    const formatCEP = async (c) => {
      const cep = c.replace(/\D/g, "");
      let dados = null;
      if (cep.length === 8) {
        dados = await consultaCep(cep);
      }
      return {
        cep: cep.replace(/(\d{5})(\d)/, "$1-$2"),
        dados: dados,
      };
    }

  const formatMoeda = (valor) => {
    const numericValue = valor.replace(/\D/g, "");
    const preco = numericValue !== "" ? (parseInt(numericValue) / 100).toFixed(2) : 0.00;
    const formatted = `${preco}`.replace(".", ",");
    const display = `R$ ${formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    return {
      preco,
      display,
    };
  }

  const formatPeso = (massa) => {
    const numericValue = massa.replace(/\D/g, "");
    const peso = numericValue !== "" ? (parseInt(numericValue) / 1000).toFixed(3) : 0;
    const formatted = peso.replace(".", ",");
    const display = `Kg ${formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    return {
      peso,
      display,
    };
  }

  const formatEstado = (sigla) => {
    let SIGLA = normalizaString(sigla);
    SIGLA = SIGLA.replace(/[^a-zA-Z]/g, "");
    return SIGLA.toUpperCase();
  }

  // Retira os acentos da palavra
  const normalizaString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Consultas externas
  const consultaCep = async (cep) => {
    let dados = null;
    await axios
      .get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
      .then(function (response) {
        if (response.data.cep) {
          dados = response.data;
        } else {
          console.log(response.data);
          message.value = "CEP inválido";
          colorAlert.value = "orange";
          popupAlert.value = true;
        }
      })
      .catch(function (error) {
        console.log(error);
        message.value = "Erro ao buscar CEP";
        colorAlert.value = "red";
        popupAlert.value = true;
      });
    return dados;
  };

  return { message, colorAlert, popupAlert, timeOutAlert, formatCPF, formatMoeda, formatPhone, formatCEP, formatEstado, formatPeso };
});
