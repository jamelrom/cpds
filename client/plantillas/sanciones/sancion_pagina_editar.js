Template.sancionPaginaEditar.rendered=function(){
  $('.fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1,
    autoclose: true,
    todayHighlight: true});

  $('select').selectpicker({countSelectedText: '{0} de {1} seleccionados',
                          selectedTextFormat:'count'});
  $('#listapartes').selectpicker('val', this.data.sancion.partes);
}

Template.sancionPaginaEditar.events({
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
        curso_id: this.sancion.curso_id,
        curso: this.sancion.curso,
        alumno_id: this.sancion.alumno_id,
        alumno: this.sancion.alumno,
        fechainicio: fechainicio.format(),
        fechafin: fechafin.format(),
        dias: $('#dias').val(),
        partes: $('#listapartes').val(),
        comentario: $('#comentario').val()};


    Sanciones.update(this.sancion._id, {$set: sancion});

    //asigno los antiguos partes de la sancion como no sancionados
    busqueda={_id: {$in: this.sancion.partes}};
    actualizacion= {$set: {
                          sancionado: false}};
    param={busqueda:busqueda,actualizacion:actualizacion};
    Meteor.call('parteActualizar',param , function(error, resultado) {
          if (error)
            return alert(error.reason);
        });

    //y marco los nuevos partes de la sanción como sancionados
    busqueda={_id: {$in: sancion.partes}};
    actualizacion= {$set: {
                          sancionado: true}};
    param={busqueda:busqueda,actualizacion:actualizacion};
    Meteor.call('parteActualizar',param , function(error, resultado) {
          if (error)
            return alert(error.reason);
        });





    Router.go('/sancion/'+ this.sancion._id+'/');



  }
});
