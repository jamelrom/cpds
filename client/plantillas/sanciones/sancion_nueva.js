Template.sancionNuevaCursoAlumno.rendered=function(){
  $('.fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1,
    autoclose: true,
    todayHighlight: true});

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
    sancion={fechainicio: fechainicio.format(),
            fechafin:fechafin.format(),
            partes:$('#listapartes').val(),
            comentario:$('#comentario').val()};

    console.log(sancion);


  }
});
