Meteor.methods({
  usuarioInsertar: function(usuario) {
    if(Meteor.users.findOne({username: usuario.username}))
      throw new Meteor.Error(400, "Ya existe un usuario con ese nombre de usuario");
    usuario.id = Accounts.createUser({
      username: usuario.username,
      password: usuario.password,
      profile: { name: usuario.name }
    });
    Roles.addUsersToRoles(usuario.id,usuario.role);
    return 0;
  }
});
