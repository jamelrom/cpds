Template.profesorEditar.rendered=function(){
  var tipo=("#"+this.data.roles[0]);

  $(tipo).click();

}

Template.profesorEditar.events({
  'submit form': function(e) {
    e.preventDefault();
    usuario ={
      _id: this._id,
      username: $('[name="usuario"]', e.target).val(),
      password: $('[name="contrasenia"]', e.target).val(),
      name: $('[name="nombre"]', e.target).val(),
      role:$('input[name="tipo"]:checked', e.target).val()
    };

      Meteor.call('usuarioEditar', usuario, function(error, resultado) {
            if (error)
              return alert(error.reason);
            if(resultado)
                alert(resultado);
          });
      param={busqueda:{profesor_id:usuario._id},actualizacion:{$set: {
                            profesor: usuario.name}}};
      Meteor.call('parteActualizar',param , function(error, resultado) {

            if (error)
              return alert(error.reason);
          });
      Router.go('profesoresLista');
  },
  'click .borrar': function(e) {
    e.preventDefault();

    if(!confirm("¿Esta seguro que desea eliminar este usuario?"))
      return;
    usuarioid=this._id;
    Meteor.call('usuarioBorrar',usuarioid,function(error, resultado) {
          if (error)
            return alert(error.reason);
          if(resultado)
              alert(resultado);
          Router.go('profesoresLista');
        });
  }
});
