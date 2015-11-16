Template.partePagina.helpers({
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
