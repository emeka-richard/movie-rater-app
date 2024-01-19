<template>
  <main>
    <Navbar />
    <section>
      <router-view></router-view>
    </section>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  /* height: 100vh; */
  /* background-color: var(--color-3); */
}
section {
  margin-top: 0.125rem;
  width: 100%;
  max-width: 1000px;
  /* height: inherit; */
}
</style>
