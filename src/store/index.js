import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('jwt'),
    sidebar: localStorage.getItem('sidebar') == 'true',
    pagenum: 1
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('jwt', token) // 토큰을 localStorage에 저장합니다.
    },
    setSidebar (state, sidebar) {
      state.sidebar = sidebar
      localStorage.setItem('sidebar', sidebar ? 'true' : 'false')
    },
    setPage (state, page) {
      state.pagenum = page
    }
  },
  actions: {
    login ({ commit }, { user, token }) {
      commit('setUser', user)
      commit('setToken', token)
    },
    setSidebar ({ commit }, { sidebar }) {
      commit('setSidebar', sidebar)
    },
    setPage({ commit }, { page }) {
      commit('setPage', page)
    }
  },
  getters: {
    isAuthenticated (state) {
      return !!state.token
    }
  },
  modules: {}
})
