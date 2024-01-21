<template>
  <section class="dashboard-wrapper">
    <section class="dashboard-content-container">
      <section class="dashboard-wecome-details">
        <div class="user-img-tag">
          <img :src="avatar" alt="user-img" />
        </div>
        <h3 class="dashboard-title">{{ welcomeTxt}}</h3>
      </section>
    </section>
    <DashboardSearchComponent />
    <MovieList />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import userIMG from "@/assets/imgs/h-img.png";
import DashboardSearchComponent from "@/components/dashboard-components/dashboardSearchComponent.vue";
import MovieList from "@/components/dashboard-components/MovieList.vue";
const store = useStore();

const computedStoreData = computed(() => {
  const userData = store.getters.getUser;
  const firstName = userData.name.split(" ")[0];
  const loggedIn = userData.loggedIn;

  return { userData, firstName, loggedIn };
});

const welcomeTxt =
  computedStoreData.value.loggedIn === true
    ? "Welcome back, " + computedStoreData.value.firstName
    : "Welcome, " + computedStoreData.value.firstName;

const avatar = userIMG;

</script>

<style scoped>
@media screen and (min-width: 769px) {
  .dashboard-wrapper {
    .dashboard-content-container {
      width: 100%;
      height: max-content;
      margin: 0.125rem auto;
      background: var(--bg-color-2);
      padding: 0.5rem 1rem;
      box-shadow: 0rem 0.125rem 0.25rem 0rem rgba(78, 78, 78, 0.282);
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: start;
    }

    .dashboard-wecome-details {
      width: 100%;
      max-width: max-content;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.875rem;
      border: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
}

.dashboard-wrapper {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* height: 90vh; */
  background-color: var(--bg-color-4);
}
.dashboard-content-container {
  width: 100%;
  height: max-content;
  margin: 0.25rem auto;
  background: var(--bg-color-6);
  padding: 0.5rem 1rem;
  box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgba(78, 78, 78, 0.282);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.dashboard-wecome-details {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  border: 1px solid rgb(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.user-img-tag {
  img {
    outline: 4px solid grey;
    border: 4px solid var(--color-3);
    border-radius: 50%;
    width: clamp(50px, 4vw, 100px);
    height: clamp(50px, 4vw, 100px);
  }
  img:hover {
    outline: 2px solid var(--word-color-1);
    border: 4px solid var(--bg-color-6);
    cursor: pointer;
  }
}
.dashboard-title {
  width: 100%;
  font-size: clamp(1.125rem, 3vw, 2.125rem);
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
