<template>
    <form @submit.prevent="reset">
      <section class="form-header">
        <h1 class="form-title">{{ formTitle }}</h1>
        <h2 @click="setFormClose">&times;</h2>
      </section>
      <h3>We would send a reset password link to your email.    </h3>
      <BaseInput
        v-model="user.email"
        model-name="email"
        label="Email"
        type-value="email"
      />
      <button name="submit" type="submit" :disabled="!isButtonDisabled">
        Reset Password
      </button>
      <p v-if="errorMessage" class="error-display">{{ errorMessage }}</p>
      <RouterLink >Back to login</RouterLink>
    </form>
  </template>
  
  <script setup>
  import BaseInput from "@/components/form-components/BaseInput.vue";
  import { ref, computed, onBeforeMount } from "vue";
  import { RouterLink, useRouter } from "vue-router";
  import { useStore } from "vuex";
  const store = useStore();
  const router = useRouter();
  
  // const computedData = computed(() => {
  //   const loggedInUser = store.getters.getUserData;
  //   const formStatus = store.getters.getFormStatus;
  //   return { loggedInUser, formStatus };
  // });
  
  const formTitle = "Tellim";
  
  const user = ref({
    email: "",
  });
  const errorMessage = ref(null);
  const isButtonDisabled = computed(() => {
    return user.value.email !== "";
  });
  
  const reset = async () => {
    if(user.value.email === "") return errorMessage.value = "Invalid email";
    // const logDate = new Date().toUTCString().slice(0, 17) + 'GMT'
    const userToBeAuthenticated = {
      email: user.value.email,
    };
    store
      .dispatch("reset", userToBeAuthenticated)
      .then(() => {
        router.push({ name: "dashboard" });
      })
      .catch((errMSG) => {
        console.error(errMSG)
        errorMessage.value = "Internal Server Error !!";
      });
  };
  
  
  const setFormClose = () => {
    store.dispatch("setFormStatus");
    router.push({ name: "hero-page" });
  };
  
  onBeforeMount(()=>{
    store.dispatch("setFormStatus", "login")
  })
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--bg-color-2);
    width: 98%;
    max-width: 500px;
    height: auto;
    padding: clamp(1.25rem, 2vw, 1.75rem);
    position: absolute;
    border: 1px solid var(--color-3);
    border-radius: 0.25rem;
    padding-bottom: 5rem;
    box-shadow: 0rem 0.125rem 1rem 0.125rem rgba(29, 28, 28, 0.512);
  }
  .form-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-bottom: 1px solid grey;
  }
  .form-header h2,
  .form-header h1 {
    padding: 0.25rem;
    display: flex;
    text-align: center;
    justify-content: center;
  }
  .form-header h2 {
    width: 35px;
    outline: 1px solid grey;
    border-radius: 0.125rem;
    height: max-content;
    cursor: pointer;
  }
  .form-title {
    font-family: "Lily Script One";
    font-size: clamp(1.375rem, 4vw, 3rem);
    margin-bottom: 1.5rem;
    padding: 0;
    /* background-color: var(--word-color-1); */
    color: var(--word-color-1);
    border-radius: 0.25rem;
  }
  h3 {
    color: var(--word-color-2);
    font-size: clamp(.75rem, 4vw, 1.125rem);
    font-weight: 600;
  }
  button {
    width: 100%;
    height: max-content;
    padding: 0.5rem;
    border-radius: 0.375rem;
    outline: none;
    border: none;
    background-color: var(--color-1);
    margin-top: 1.25rem;
    /* margin-bottom: 0.75rem; */
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: 600;
  }
  button:disabled {
    background-color: var(--bg-color-3);
  }
  
  button:focus {
    border: 1px solid var(--word-color-1);
    transition: all 300ms ease-in;
  }
  small {
    font-size: clamp(0.75rem, 5vw, 1.25rem);
    margin-top: .5rem;

  }
  .error-display {
    display: flex;
    text-align: center;
    justify-content: center;
    color: red;
    font-size: clamp(0.75rem, 4vw, 1.25rem);
    width: 100%;
    height: max-content;
    border-radius: 0.25rem;
    background-color: var(--bg-color-5);
    transition: all 200ms ease-out;
    padding: 0.125rem;
    margin-bottom: 0.25rem;
  }
  .link {
  color: var(--word-color-4);
  cursor: pointer;
  margin-top: 3rem;
}
  </style>
  