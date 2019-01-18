Vue.component("list-users", {
  template: "#listUsers",
  /* Hacerlo con data y luego editarlo para usar VUEX */
  /* data() {
    return {
      users: null
    };
  }, */
  computed:{
      /* Editar en el template la iteracion */
    Users(){
        return this.$store.getters.getUsers
    }
  },
  async created() {
    try {
      let resp = await fetch("/user/get");
      let arrUsers = await resp.json();
      console.log(arrUsers.users);
      this.$store.dispatch("addUsers", arrUsers.users)
      //this.users = arrUsers.users;
    } catch (error) {
      console.log(error);
    }
  }
});


/* Hacer esto y luego explicar VUEX  */
Vue.component("form-user", {
  template: "#formUser",
  data() {
    return {
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: ""
      }
    };
  },
  methods: {
    handlerForm() {
      console.log(this.user);
      axios
        .post("/user/create", this.user)
        .then(res => {
            this.$store.dispatch("newUser", res.data.user)
            this.resetValueForm
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetValueForm(){
        this.user.username = ""
        this.firstname = ""
        this.lastname = ""
        this.email = ""        
    }
  }
});
