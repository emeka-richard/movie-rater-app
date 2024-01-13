import Vuex from "vuex";
import axios from "axios";


export default new Vuex.Store({
  state: {
    countries: [],
    user: null,
    isOpenForm: true,
  },
  mutations: {
    SET_COUNTRY_DATA(state, countryName) {
      const sortedCountryData = countryName.sort()
      state.countries = sortedCountryData;
      localStorage.setItem("countries", JSON.stringify(sortedCountryData));
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
    SET_FORM(state, actions) {
      if (actions === "login" || actions === "register") {
        localStorage.setItem("isOpenForm", false);
        state.isOpenForm = false;
      } else {
        localStorage.setItem("isOpenForm", true);
        state.isOpenForm = true;
      }
    },
    CLEAR_USER() {
      localStorage.removeItem("user");
      localStorage.removeItem("isOpenForm");
    //   localStorage.removeItem("countries");
      location.reload();
    },
  },
  actions: {
    initiateCountryStat: async ({ commit }) => {
      return axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          const retrievedCountries = response.data.map(b => b.name.common)
          commit("SET_COUNTRY_DATA", retrievedCountries)
        })
        .catch((error) => {
          throw Error(error.response.data.message);
        });
    },
    register: async ({ commit }, credentials) => {
      return axios
        .post("//localhost:8000/register", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
          commit("SET_FORM");
        })
        .catch((error) => {
          throw Error(error.response.data.message);
        });
    },
    login: async ({ commit }, credentials) => {
      return axios
        .post("//localhost:8000/login", credentials)
        .then(({ data }) => {
          console.log(data)
          commit("SET_USER_DATA", data);
          commit("SET_FORM");
        })
        .catch((error) => {
          throw Error(error.response.data.message);
        });
    },
    setFormStatus({ commit }, actions) {
      commit("SET_FORM", actions);
    },
    logout: async ({ commit }, credentials) => {
      commit("SET_FORM");
      commit("CLEAR_USER");

      return axios
        .post("//localhost:8000/logout", credentials)
        .catch((error) => {
          throw Error(error.response.data.message);
        });
    },
  },
  getters: {
    getUserData(state) {
      const existingUser = localStorage.getItem("user");
      return existingUser ? true : false
    },
    getUser(state){
      return state.user
    },
    getFormStatus(state) {
      return state.isOpenForm;
    },
    getCountryData(state) {
      return state.countries;
    },
  },
});
