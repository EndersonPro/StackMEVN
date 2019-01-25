var ListUser = Vue.component("list-users", {
  template: "#listUsers",
  /* Hacerlo con data y luego editarlo para usar VUEX */
  /* data() {
    return {
      users: null
    };
  }, */
  computed: {
    /* Editar en el template la iteracion */
    Users() {
      return this.$store.getters.getUsers;
    }
  },
  methods: {
    deleteUser(user) {
      const { _id } = user;
      axios.delete(`/user/${_id}/delete`).then(res => {
        this.$store.dispatch("deleteUser", user);
        console.log(res);
      });
    }
  },
  async created() {
    try {
      let resp = await fetch("/user/get");
      let arrUsers = await resp.json();
      this.$store.dispatch("addUsers", arrUsers.users);
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
          this.$store.dispatch("newUser", res.data.user);
          this.resetValueForm;
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetValueForm() {
      this.user.username = "";
      this.firstname = "";
      this.lastname = "";
      this.email = "";
    }
  }
});

var EditarUsuario = Vue.component("editar-usuario", {
  template: "#editUser",
  data() {
    return {
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: ""
      },
      id:''
    };
  },
  created() {
    /* TODO */
    // this.$route.params.id;
    this.id = this.$route.params.id;
    var user = this.$store.getters.getUsers.filter(user => user._id === this.id)
    this.user = user[0]
    // console.log(this.user)
  },
  methods:{
    handlerForm(){
      axios.put(`/user/${this.id}/update`, this.user)
        .then(res=>{
          // No sera necesario 
          this.$router.push({path:"/"})
        })
        .catch(err=>console.log(err))
    }
  }
});
