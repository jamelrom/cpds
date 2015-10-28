Template.partesNuevoCursoAlumno.events({
  'submit form': function(e) {
    e.preventDefault();
    //console.log(Meteor.users.findOne(Meteor.userId()).profile.nombre);
if($('input[name="options"]:checked', e.target).val()=='')
  alert('Debes seleccionar una gravedad para el parte');


  var parte = {
      curso_id: this.curso._id,
      curso: this.curso.nombre,
      alumno_id: this.alumno._id,
      alumno: this.alumno.nombre,
      profesor_id: Meteor.userId(),
      profesor: Meteor.users.findOne(Meteor.userId()).profile.nombre,
      gravedad: $('input[name="options"]:checked', e.target).val(),
      comentario: $(e.target).find('[name=comentario]').val()
    };

    parte._id = Partes.insert(parte);
    Router.go('partePagina', parte);
  }
});
