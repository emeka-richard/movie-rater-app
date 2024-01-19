<template>
  <RouterView />
</template>

<script setup>
// import Navbar from "@/components/Navbar.vue";
import { onBeforeMount } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const router = useRouter();

onBeforeMount(() => {
  const userProp = localStorage.getItem("user");
  const formStatus = localStorage.getItem("isOpenForm");
  const countryData = localStorage.getItem("countries");
  if (userProp) {
    const userDataJSON = JSON.parse(userProp);
    store.commit("SET_USER_DATA", userDataJSON);
    router.push({ name: "dashboard" });
  }
  if (formStatus === "false") {
    store.commit("SET_FORM", "login");
  }
  if (countryData) {
    store.commit("SET_COUNTRY_DATA", JSON.parse(countryData));
  } else {
    store.dispatch("initiateCountryStat");
  }
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch("logout");
      }
      return Promise.reject(error);
    }
  );
});
</script>

<style scoped>
/* main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--color-3);
} */
</style>
