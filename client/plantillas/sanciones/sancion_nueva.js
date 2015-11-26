Template.sancionNuevaCursoAlumno.rendered=function(){
  $('.fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1,
    autoclose: true,
    todayHighlight: true,
    disableTouchKeyboard: true});

  $('#fechainicio').datepicker("setDate", new Date());
  $('#fechafin').datepicker("setDate", new Date());

  $('select').selectpicker({countSelectedText: '{0} de {1} seleccionados',
                          selectedTextFormat:'count'});

}
Template.sancionNuevaCursoAlumno.events({
  'submit form': function(e) {
    e.preventDefault();

    fechainicio=moment($('#fechainicio').val(),"DD/MM/YYYY");
    fechafin=moment($('#fechafin').val(),"DD/MM/YYYY");

    if(!fechainicio.isValid())
      return alert("La Fecha de Inicio no es un fecha valida");
    if(!fechafin.isValid())
      return alert("La Fecha de Fin no es un fecha valida");
    if(!$('#listapartes').val())
      return alert("Debes seleccionar algún parte para sancionar");
    if(!$('#comentario').val())
      return alert("Debe introducir algún comentario");
    if(!$('#dias').val())
      return alert("Debe introducir los días lectivos que tendrá la sanción");
    sancion={
        curso_id: this.curso._id,
        curso: this.curso.curso,
        alumno_id: this.alumno._id,
        alumno: this.alumno.nombre,
        fechainicio: fechainicio.format(),
        fechafin: fechafin.format(),
        dias: $('#dias').val(),
        partes: $('#listapartes').val(),
        comentario: $('#comentario').val()};

    Sanciones.insert(sancion, function(error, result) {
      if(error)
        alert("No se ha insertado la sanción: "+error);
      else {
        Router.go("/sancion/todos/")
        }
    });

    busqueda={_id: {$in: $('#listapartes').val()}};
    actualizacion= {$set: {
                          sancionado: true}};
    param={busqueda:busqueda,actualizacion:actualizacion};
    Meteor.call('parteActualizar',param , function(error, resultado) {
          if (error)
            return alert(error.reason);
        });


  }
});
