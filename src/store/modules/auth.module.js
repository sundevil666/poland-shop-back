export default {
  namespaced: true,
  state() {
    return {
      token: true,
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token
    }
  }
}
