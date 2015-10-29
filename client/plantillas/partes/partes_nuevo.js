Template.partesNuevoCursoAlumno.events({
  'submit form': function(e) {
    e.preventDefault();

  var parte = {
      curso_id: this.curso._id,
      curso: this.curso.curso,
      alumno_id: this.alumno._id,
      alumno: this.alumno.nombre,
      profesor_id: Meteor.userId(),
      profesor: Meteor.users.findOne(Meteor.userId()).profile.nombre,
      gravedad: $('input[name="options"]:checked', e.target).val(),
      comentario: $(e.target).find('[name=comentario]').val()
    };

    Meteor.call('parteInsertar', parte, function(error, resultado) {
          if (error)
            return alert(error.reason);

          Router.go('partePagina', {_id: resultado._id});
        });
/*    parte._id = Partes.insert(parte);
    Router.go('partePagina', parte);*/
  }
});
