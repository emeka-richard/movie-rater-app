
<template>
    <main>
        <RouterView />
    </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  /* background-color: var(--color-3); */
}
</style>