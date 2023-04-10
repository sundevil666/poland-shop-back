<template>
  <button :type="typeInput" class="btn" :disabled="disabled" :class="typeBtn">{{ label }}</button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    label: {
      type: String,
      default: 'label'
    },
    typeBtn: {
      type: String,
      default: 'btn-primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    typeInput: {
      type: String,
      default: 'submit'
    }
  }
}
</script>

<style scoped>

</style>
