<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">{{ label }}</label>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="typeInput"
        class="form-control"
        id="exampleFormControlInput1"
        :placeholder="placeholder"
    >
  </div>
</template>

<script>

export default {
  name: "TheInput",
  props: {
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: 'label'
    },
    placeholder: {
      type: String,
      default: 'label'
    },
    typeInput: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style scoped>

</style>
