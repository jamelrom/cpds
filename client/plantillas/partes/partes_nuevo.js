Template.partesNuevoCursoAlumno.helpers({
  horaactual: function(){
     return moment().format('hh')+":"+moment().format('mm');
   }
});

Template.partesNuevoCursoAlumno.events({
  'submit form': function(e) {
    e.preventDefault();

    fecha=moment($('[name=fecha]').val()+" "+$('[name=hora]').val(),"DD/MM/YYYY HH:mm");

  var parte = {
      curso_id: this.curso._id,
      curso: this.curso.curso,
      alumno_id: this.alumno._id,
      alumno: this.alumno.nombre,
      fecha: fecha.format(),
      profesor_id: Meteor.userId(),
      profesor: Meteor.users.findOne(Meteor.userId()).profile.name,
      gravedad: $('input[name="options"]:checked', e.target).val(),
      comentario: $(e.target).find('[name=comentario]').val(),
      sancionado:false
    };
    //console.log(parte.gravedad);
    Meteor.call('parteInsertar', parte, function(error, resultado) {
          if (error)
            return alert(error.reason);

          Router.go('partePagina', {_id: resultado._id});
        });
  }
});

Template.partesNuevoCursoAlumno.rendered=function(){
  $('#fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1,
    autoclose: true,
    todayHighlight: true});

  $('#fecha').datepicker("setDate", new Date());

  $('.clockpicker').clockpicker({
        autoclose:true,
        'default':'now'
      });

  //Por defecto se le presentará al usuario el botón de leve activado
  $("#leve").click();
}
