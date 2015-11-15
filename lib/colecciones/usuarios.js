Meteor.methods({
  usuarioInsertar: function(usuario) {
    if(!usuario.username)
      throw new Meteor.Error(400, "No se ha introducido un usuario");
    if(!usuario.name)
      throw new Meteor.Error(400, "No se ha introducido un nombre");
    if(!usuario.password)
      throw new Meteor.Error(400, "No se ha introducido contraseña");
    if(Meteor.users.findOne({username: usuario.username}))
      throw new Meteor.Error(400, "Ya existe un usuario con ese nombre de usuario");
    if(Meteor.users.findOne({profile: {name: usuario.name}}))
      throw new Meteor.Error(400, "Ya existe un usuario con ese nombre");
    usuario.id = Accounts.createUser({
      username: usuario.username,
      password: usuario.password,
      profile: { name: usuario.name }
    });
    Roles.addUsersToRoles(usuario.id,usuario.role);
    return 0;
  },

  usuarioEditar: function(usuario) {
    usuarioViejo=Meteor.users.findOne(usuario._id);
    if(!usuario)
      throw new Meteor.Error(400, "Este usuario no existe");
    if(usuarioViejo.username != usuario.username && Meteor.users.findOne({username: usuario.username}))
      throw new Meteor.Error(400, "Ya existe un usuario con ese nombre de usuario");
    if(usuarioViejo.profile.name != usuario.name && Meteor.users.findOne({profile: {name: usuario.name}}))
      throw new Meteor.Error(400, "Ya existe un usuario con ese nombre");
    if(usuarioViejo.username!=usuario.username)
      Accounts.setUsername(usuarioViejo._id, usuario.username);
    if(usuario.name && usuarioViejo.profile.name!=usuario.name)
        Meteor.users.update(usuario._id, {$set: {profile: {name: usuario.name}}});
    if(usuario.password)
      Accounts.setPassword(usuario._id,usuario.password);

    if(usuarioViejo.roles[0]!=usuario.role){
      Roles.setUserRoles(usuario._id, [usuario.role]);
      //Roles.addUsersToRoles(usuario._id,usuario.role);
      tutoria=Cursos.findOne({tutor:usuario._id});
      if(tutoria && usuario.role!='tutor')
        return "tenga en cuenta que el grupo "+tutoria.curso+" ha quedado sin tutor";
      else if(!tutoria && usuario.role==='tutor')
        return "debe asignar una tutoría a este profesor en el apartado de cursos";
    }
    return "los cambios han sido realizados con éxito";
  },
  'usuarioBorrar': function(usuarioid){
    Meteor.users.remove(usuarioid);
    return "Usuario borrado con éxito";
  }
});
