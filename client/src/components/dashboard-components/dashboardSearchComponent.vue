<template>
  <section class="dashboard-analytics-section">
    <div class="dashboard-analytics-container">
      <p> {{ dashboardNote.p1 }}</p>
    </div>
    <div class="impression-container">
      <input id="search-input" type="text" placeholder="Search for movies ..." />
      <button @click="" type="button">Search</button>
      <!-- <button>&plus;</button> -->
    </div>
  </section>
</template>

<script setup>

const thisYear = new Date().getFullYear()
const dashboardNote = {
  p1: "Review and watch top " + thisYear +" movies & series. See what others are saying about it too ✨"
}
</script>

<style scoped>
.dashboard-analytics-section {
  width: 100%;
  height: max-content;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
}
.dashboard-analytics-container {
  width: 100%;
  /* max-width: 400px; */
  height: auto;
  background-color: var(--bg-color-2);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgba(27, 27, 27, 0.059);
  text-align: justify;

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 300;
  }
}
.impression-container {
  width: 100%;
  height: auto;
  margin: 0.5rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding-top: .125rem;
      padding-bottom: .125rem; */
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: var(--bg-color-2);

  input {
    width: 100%;
    height: max-content;
    padding: 0.5rem;
    border-radius: 0.375rem;
    outline: none;
    border: none;
    background-color: rgba(203, 203, 203, 0.786);
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 500;

    &:focus {
      border: 2px solid var(--color-1);
      background-color: rgba(223, 223, 223, 0.852);
    transition: all 300ms ease-in;
    }

    &:hover {
      border: 1px solid var(--color-1);
      background-color: rgba(223, 223, 223, 0.852);
      transition: all 200ms ease-in;
    }
  }

  button {
    width: max-content;
    height: auto;
    border-radius: 0.5rem;
    margin-left: 1rem;
    padding: 0.5rem;
    outline: none;
    border: none;
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: var(--bg-color-2);
    background-color: var(--color-3);
    cursor: pointer;

    &:hover {
      color: var(--color-3);
      background-color: var(--bg-color-2);
      border: 1px solid var(--color-3);
      transition: all 300ms ease-in-out ;
    }
  }
}
</style>
