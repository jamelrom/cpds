Template.profesorEditar.rendered=function(){
  //se obtiene el rol que ocupa el profesor y como le hemos puesto los id igual que se guardan en la bbdd podemos llamar al evento click directamente
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
      //una vez cambiado el profesor llamamos a los metodos para actualizar los partes y sanciones
      param={busqueda:{profesor_id:usuario._id},actualizacion:{$set: {
                            profesor: usuario.name}}};
      Meteor.call('parteActualizar',param , function(error, resultado) {

            if (error)
              return alert(error.reason);
          });
    
      Router.go('/admin/profesores/');
  },
  'click .borrar': function(e) {
    e.preventDefault();

    if(!confirm("¿Esta seguro que desea eliminar este usuario?"))
      return;
    usuarioid=this._id;
    //no se hace comprobación de si un usuario tiene partes, ya que los profesores sustitutos es deseable eliminarlos
    //del sistema para que no tengan acceso a él, cuando dejan de tener relación con el centro, pero mantener los
    //partes que han impuesto y su nombre en ellos.
    Meteor.call('usuarioBorrar',usuarioid,function(error, resultado) {
          if (error)
            return alert(error.reason);
          if(resultado)
              alert(resultado);
          Router.go('/admin/profesores/');
        });
  }
});
