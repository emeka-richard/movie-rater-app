<template>
    <label :for="modelName" class="">{{ label }}</label>
    <input 
        :id="modelName"
        :value="modelValue" 
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="typeValue"
        required
        />
</template>


<script setup>

const props = defineProps({
    label: {type: String, default: ""},
    modelValue: { type: [String, Number], default: ""},
    typeValue: { type: String, default: ""},
    modelName: { type: String, default: ""}
})

</script>


<style scoped>
label {
    margin-top: 1.125rem;
    margin-bottom: .375rem;
    font-size: clamp(1rem, 5vw, 1.5rem);
    font-weight: 800;
    color: var(--word-color-2);
}
input {
    width: 100%;
    height: max-content;
    padding: .5rem;
    border-radius: .375rem;
    outline: none;
    border: none;
    background-color: rgba(203, 203, 203, 0.706);
    font-size: clamp(1rem, 4vw, 1.375rem);
    font-weight: 500;
    color: var(--word-color-4);
}
input:focus {
    border: 1px solid var(--color-1);
    transition: all 300ms ease-in;
}

</style>