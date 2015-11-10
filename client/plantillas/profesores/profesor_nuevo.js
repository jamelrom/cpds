Template.profesorNuevo.events({
  'submit form': function(e) {
    e.preventDefault();
    usuario ={
      username: $('[name="usuario"]', e.target).val(),
      password: $('[name="contrasenia"]', e.target).val(),
      name: $('[name="nombre"]', e.target).val(),
      role:$('input[name="tipo"]:checked', e.target).val()
    };
    
      Meteor.call('usuarioInsertar', usuario, function(error, resultado) {
            if (error)
              return alert(error.reason);

            Router.go('profesoresLista');
          });

  }
});

Template.profesorNuevo.rendered=function(){
  //Por defecto el usuario es de tipo profesor
  $("#profesor").click();
}
