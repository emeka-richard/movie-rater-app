<template>
    <section class="dashboard-analytics-section">
      <div class="dashboard-analytics-container">
        <p>Someone somewhere wants to here your opinion on life's salient issues.</p>
      </div>
      <div class="impression-container">
          <BaseInput />
          <button>&plus;</button>
        </div>
    </section>
  </template>
  
  <script setup>
  import BaseInput from "../form-components/BaseInput.vue"
  </script>
  
  <style scoped>
  .dashboard-analytics-section {
      width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;
  }
  .dashboard-analytics-container {
      width: 100%;
      /* max-width: 400px; */
      height: auto;
      background-color: var(--bg-color-2);
      padding: .5rem 1rem;
      border-radius: .25rem;
      box-shadow: 0rem 0.125rem 0.25rem 0.125rem rgba(27, 27, 27, 0.059);
  
      p {
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
      }
  }
  .impression-container {
      width: 100%;
      height: auto;
      margin: .5rem auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: .125rem;
      padding-bottom: .125rem;
      padding: .25rem ;
      border-radius: .375rem;
      background-color: var(--bg-color-2);
  
      button {
          width: 50px;
          aspect-ratio: 1;
          border-radius: 50%;
          margin-left: .25rem;
          outline: none;
          border: none;
          font-size: clamp(1.5rem, 2vw, 2.5rem);
          color: var(--bg-color-2);
          background-color: var(--word-color-2);
      }
  }
  </style>
  