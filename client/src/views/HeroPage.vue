<template>
    <section v-if="computedProps.formStatus === true" class="hero-section">
      <h1>{{ welcomeText.h1 }}</h1>
      <section class="hero-sub-section">
        <h2>{{ welcomeText.h2 }}</h2>
        <p>
          {{ welcomeText.p
          }}<span class="link" @click="navigateLink('login')">login</span> or
          <span class="link" @click="navigateLink('register')">register</span>.
        </p>
      </section>
    </section>
  </template>
  
  <script setup>
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { computed } from "vue";
  const store = useStore();
  const router = useRouter();
  
  const computedProps = computed(() => {
    const formStatus = store.getters.getFormStatus;
    return { formStatus };
  });
  
  const welcomeText = {
    h1: "InspiroVerse",
    h2: "Share and pick up an inspirational verse today.",
    p: "To use the app, you'll need to ",
  };
  
  const navigateLink = (e) => {
    store.dispatch("setFormStatus", e).then(() => {
      if (e === "login") {
        router.push({ name: "login" });
      } else if (e === "register") {
        router.push({ name: "register" });
      }
    });
  };
  </script>
  
  <style scoped>
  .hero-section {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
    height: 100vh;
  }
  .hero-sub-section {
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    border-radius: .25rem;
    background-color: var(--word-color-3);
  }
  
  .hero-section h1 {
    width: max-content;
    margin: 1rem auto;
    font-family: "Euphoria Script";
    font-size: clamp(1.625rem, 10vw, 3rem);
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    margin-bottom: 3rem;
    border-radius: 0.25rem;
    background: transparent;
    box-shadow: 0rem 0rem 0.25rem 0.125rem rgba(255, 255, 255, 0.1);
  }
  .hero-sub-section h2 {
    font-size: clamp(1.5rem, 5vw, 2.125rem);
    font-weight: 600;
  }
  
  .hero-sub-section p {
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: 500;
    margin-top: 1rem;
  }
  .hero-section h1,
  .hero-sub-section h2,
  .hero-sub-section p {
    color: var(--bg-color-2);
  }
  .link {
    color: var(--bg-color-2);
    text-decoration: underline;
    cursor: pointer;
  }
  </style>
  