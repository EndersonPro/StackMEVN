const store = new Vuex.Store({
  state: {
    users: Array
  },
  getters: {
    getUsers: state => state.users
  },
  mutations: {
    ADD_USERS(state, payload) {
      state.users = payload;
    },
    NEW_USER(state, payload) {
      state.users = [...state.users, payload];
    },
    DELETE_USER(state, payload) {
      state.users = state.users.filter(user => user != payload);
    }
  },
  actions: {
    addUsers: (context, users) => {
      context.commit("ADD_USERS", users);
    },
    newUser: (context, user) => {
      context.commit("NEW_USER", user);
    },
    deleteUser: (context, user) => {
      context.commit("DELETE_USER", user);
    }
  }
});
