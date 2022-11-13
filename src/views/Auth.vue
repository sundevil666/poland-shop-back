<template>
  <div class="auth-page mt-5">
    <div class="w-75 mx-auto">
      <h1>Аuthorization</h1>
      <form>
        <the-input
          label="Email"
          placeholder="name@example.com"
        />
        <the-input
          label="Password"
          placeholder="Password"
          type-input="password"
        />
        <the-button label="Sign in" />
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Auth",

}
</script>

<style scoped>

</style>
