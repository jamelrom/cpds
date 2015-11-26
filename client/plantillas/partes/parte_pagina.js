Template.partePagina.helpers({
  //Este ayudante nos permite identificar quien puede editar un parte, el jefe de estudios puede editar siempre,
  //el resto de profesores siempre que sean los autores del parte y no este ya sancionado
  puedeEditar: function(){
    var user = Meteor.userId();
    if (user && Roles.userIsInRole(user, ['jefe']))
      return true;
    else if(user && user===this.profesor_id && this.sancionado===false)
      return true;
    else
      return false;
   }
});

Template.partePagina.events({
  'submit form': function(e) {
    e.preventDefault();
    if(confirm("¿Seguro que quiere borrar el parte?")){
      Partes.remove(this._id);
      Router.go('home');
    }
    }
});
