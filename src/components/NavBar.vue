<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Shop</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="item in navList" :key="item.id">
            <router-link exact-active-class="" class="nav-link" aria-current="page" :to="item.url">{{ item.label }}</router-link>
          </li>
        </ul>

        <div class="ms-auto">
          <button class="btn btn-primary" @click="logoOut">LogOut</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { setItem } from '@/helpers/persistanceStorage';

export default {
  name: "NavBar",
  props: {
    navList: {
      type: Array,
      required: true,
    }
  },
  methods: {
    logoOut() {
      setItem('accessToken', '')
      this.$router.push({name: 'Auth'});
    }
  }
}
</script>

<style>
.nav-link.active {
  border-bottom: 1px solid red;
}
</style>
