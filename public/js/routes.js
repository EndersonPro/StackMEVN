var router = new VueRouter({
  routes: [
    {
      path: "/",
      component: ListUser
    },
    {
      path: "/editar/:id",
      component: EditarUsuario
    }
  ]
});
