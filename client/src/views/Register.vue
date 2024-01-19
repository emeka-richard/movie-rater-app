<template>
    <form @submit.prevent="register">
    <!-- <form v-if="!computedData.formStatus" @submit.prevent="register"> -->
      <div class="form-header">
        <h1 class="form-title">{{ formTitle }}</h1>
        <h2 @click="setFormClose">&times;</h2>
      </div>
      <BaseInput
        v-model="user.firstName"
        label="First name"
        model-name="firstName"
        type-value="text"
        aria-required="true"
      />
      <BaseInput
        v-model="user.lastName"
        label="Last Name"
        model-name="lastName"
        type-value="text"
        aria-required="true"
      />
      <BaseSelect
        :options="countries"
        v-model="user.nationality"
        label="Select Country"
      />
      <BaseInput
        v-model="user.email"
        label="Email"
        model-name="email"
        type-value="email"
        aria-required="true"
      />
      <BaseInput
        v-model="user.password"
        label="Password"
        model-name="password"
        type-value="password"
        aria-required="true"
      />
      <button name="submit" type="submit" :disabled="!isButtonDisabled">
        Register
      </button>
      <p v-if="errorMessage" class="error-display">{{ errorMessage }}</p>
      <small
        ><em
          >Already created an account?
          <RouterLink to="/login">login</RouterLink></em
        ></small
      >
    </form>
  </template>
  
  <script setup>
  import BaseInput from "@/components/form-components/BaseInput.vue";
  // import BaseSelect from "@/components/form-components/BaseSelect.vue";
  import BaseSelect from "@/components/form-components/BaseSelect.vue";
  import { ref, reactive, computed, onBeforeMount } from "vue";
  import { RouterLink, useRouter } from "vue-router";
  import { useStore } from "vuex";
  const store = useStore();
  const router = useRouter();
  
  const computedData = computed(() => {
    const loggedInUser = store.getters.getUserData;
    const formStatus = store.getters.getFormStatus;
    const countries = store.getters.getCountryData;
    return { loggedInUser, formStatus, countries };
  });
  
  const formTitle = "Tell-Em";
  
  const user = ref({
    firstName: "",
    lastName: "",
    gender: "Select",
    nationality: "Select",
    email: "",
    password: "",
  });
  // const gender = ["Select", "Male", "Female"]
  const countries = ["Select", ...computedData.value.countries ]
  const errorMessage = ref(null);
  
  const isButtonDisabled = computed(() => {
    return (
      user.value.password !== "" &&
      user.value.email !== "" &&
      user.value.nationality !== "" &&
      // user.value.gender !== "" &&
      user.value.firstName !== "" &&
      user.value.lastName !== ""
    );
  });
  
  const register = async () => {
    if(user.value.firstName === "" || user.value.lastName === "" || user.value.nationality === "" || user.value.email === "" || user.value.password === "") return errorMessage.value = "Invalid email and password" 

    const userToBeRegistered = {
      name: user.value.firstName + " " + user.value.lastName,
      // gender: user.value.gender,
      country: user.value.nationality,
      email: user.value.email,
      pwd: user.value.password,
      loggedIn: false
    };
    store
      .dispatch("register", userToBeRegistered)
      .then(() => {
        router.push({ name: "dashboard" });
      })
      .catch((errMSG) => {
        errorMessage.value = errMSG.message;
      });
  };
  
  
  const setFormClose = () => {
    store
      .dispatch("setFormStatus")
      .then(() => router.push({ name: "hero-page" }));
  };
  
  onBeforeMount(()=>{
    store.dispatch("setFormStatus", "register")
  })
  
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--bg-color-2);
    width: 100%;
    max-width: 500px;
    height: auto;
    padding: 1rem;
    padding: clamp(1.25rem, 5vw, 1.75rem);
    border-radius: 0.25rem;
    position: absolute;
  }
  .form-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
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
  }
  .form-title {
    font-family: "Lily Script One";
    font-size: clamp(1.375rem, 2vw, 3rem);
    border-radius: 0.25rem;
    color: var(--word-color-1);
  }
  form button {
    width: 100%;
    height: max-content;
    padding: 0.5rem;
    border-radius: 0.375rem;
    outline: none;
    border: none;
    background-color: var(--color-1);
    margin-top: 3.125rem;
    margin-bottom: 0.75rem;
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: 600;
  }
  form button:disabled {
    background-color: var(--bg-color-3);
  }
  form button:focus {
    border: 1px solid var(--word-color-1);
    transition: all 300ms ease-in;
  }
  small {
    font-size: clamp(0.75rem, 5vw, 1.25rem);
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
  </style>
  