<template>
  <div class="auth-page mt-5">
    <div class="w-75 mx-auto">
      <h1>Аuthorization</h1>
      <form @submit.prevent="onSubmit()">
        <the-input
            v-model="user.name"
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
        name: null,
        password: null,
      }
    }
  },
  methods: {
    onSubmit () {
      const data = {
        email: this.user.name,
        password: this.user.password
      }
      this.$store.dispatch('auth', data)
          .then(() => {
            this.$router.push({name: 'home'})
          })
    }
  }

}
</script>
