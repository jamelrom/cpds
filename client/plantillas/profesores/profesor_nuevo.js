Template.profesorNuevo.events({
  'submit form': function(e) {
    e.preventDefault();
    usuario ={
      username: $('[name="usuario"]', e.target).val(),
      password: $('[name="contrasenia"]', e.target).val(),
      name: $('[name="nombre"]', e.target).val(),
      role:$('input[name="tipo"]:checked', e.target).val()
    };
    console.log(usuario.role);
    Meteor.call('usuarioInsertar', usuario, function(error, resultado) {
          if (error)
            return alert(error.reason);
          if(resultado!=0) alert(resultado)
          Router.go('/admin/profesores/');
        });

  }
});

Template.profesorNuevo.rendered=function(){
  //Por defecto el usuario es de tipo profesor
  $("#profesor").click();
}
