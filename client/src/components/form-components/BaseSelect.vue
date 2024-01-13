<template>
    <label :for="label">{{ label }}</label>
    <select
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value);
        },
      }"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </template>
  
  <script setup>
  const props = defineProps({
    label: { type: String, default: "" },
    modelValue: { type: [String, Number], default: "" },
    options: { type: Array, required: true },
  });
  </script>
  
  <style scoped>
  select,
  option,
  label {
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: 800;
  }
  label {
    margin-top: 1.125rem;
    margin-bottom: 0.375rem;
  }
  select, option {
    width: 100%;
    height: max-content;
    padding: 0.5rem;
    border-radius: 0.375rem;
    outline: none;
    border: none;
    background-color: rgba(203, 203, 203, 0.706);
  }
  select:focus, option:focus {
      border: 1px solid var(--color-1);
      transition: all 300ms ease-in;
  }
  
  </style>
  