<template>
  <div class="auth-page mt-5">
    <div class="w-75 mx-auto">
      <h1>Аuthorization</h1>
      <form @submit.prevent="onSubmit">
        <the-input
            v-model="user.email"
          label="Email"
          placeholder="name@example.com"
        />
        <the-input
          v-model="user.password"
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
  data() {
    return {
      user: {
        email: null,
        password: null,
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth', this.user)
          .then(() => {
            this.$router.push({name: 'Home'});
          })
    }
  }

}
</script>
