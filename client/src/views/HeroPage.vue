<template>
  <div class="hero-wrapper">
    <section class="hero-section">
      <h1>{{ welcomeText.h1 }}</h1>
      <section class="hero-sub-section">
        <h2>{{ welcomeText.h2 }}</h2>
        <p>
          {{ welcomeText.p1 }}
          <span class="link" @click="navigateLink('login')">here</span>.
        </p>
      </section>
    </section>
  </div>
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

const thisYear = new Date().getFullYear();

const welcomeText = {
  h1: "Tell-Em",
  h2:
    "Review and watch top " +
    thisYear +
    " movies & series. See what others are saying about it too ✨",
  p1: "To get started, click ",
  // p2: "to use the app.",
};

const navigateLink = (e) => {
  store.dispatch("setFormStatus", e).then(() => {
    router.push({ name: "login" });
    // if (e === "login") {
    //   router.push({ name: "login" });
    // } else if (e === "register") {
    //   router.push({ name: "register" });
    // }
  });
};
</script>

<style scoped>
/* .hero-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    max-width: 1000px;
    height: 100vh;
  } */
.hero-wrapper,
.hero-section {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}
.hero-section {
  max-height: max-content;
  background-color: var(--bg-color-6);
  border-radius: 0.25rem;
  padding: 3rem 0;
}
.hero-wrapper {
  height: 100vh;
  max-height: 500px;
}
.hero-sub-section {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.5rem;
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
  /* color: var(--word-color-3); */
  box-shadow: 0rem 0rem 0.25rem 0.125rem rgba(33, 58, 147, 0.409);
}
.hero-sub-section h2 {
  font-size: clamp(1.125rem, 5vw, 2.125rem);
  font-weight: 600;
  /* color: var(--word-color-3); */
}

.hero-sub-section p {
  font-size: clamp(0.75rem, 5vw, 1.5rem);
  font-weight: 500;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0.5px solid var(--color-1);
}
.hero-section h1,
.hero-sub-section h2,
.hero-sub-section p {
  color: var(--word-color-2);
}
.link {
  color: var(--bg-color-2);
  cursor: pointer;
  background-color: var(--word-color-2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}
.link:hover {
  color: var(--word-color-2);
  background-color: var(--bg-color-2);
  border: 1px solid var(--word-color-2);
  transition: all 300ms ease-in-out;
}
</style>
