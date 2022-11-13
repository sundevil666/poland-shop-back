<template>
  <button type="button" class="btn" :class="typeBtn">{{ label }}</button>
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
    }
  }
}
</script>

<style scoped>

</style>
