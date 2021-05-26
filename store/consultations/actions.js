export default {
  async load({ commit }) {
    const list = await this.$axios.$get('/api/v1/users/me/consultations');
    commit('setList', list);
  },

  async loadOne({ commit }, id) {
    const item = await this.$axios.$get(`/api/v1/consultations/${id}`);
    commit('setItem', item);
  }
}
