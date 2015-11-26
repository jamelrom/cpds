Template.partePaginaEditar.rendered=function(){
  $('#fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1, //la semana empieza en lunes
    autoclose: true, //cuando pulse una fecha se cierra automaticamente
    todayHighlight: true, //aparece el dia actual resaltado
    disableTouchKeyboard: true}); //desactiva el teclado en los dispositivos moviles

    $('.clockpicker').clockpicker({
      autoclose:true,
      'default':'now'
    });

    var tipo=("#"+this.data.gravedad).split(' ').join('');//le quitamos los espacios al tipo de gravedad para el tipo muy grave

    $(tipo).click();

}

Template.partePaginaEditar.events({
'submit form': function(e) {
  e.preventDefault();

  fecha=moment($('[name=fecha]').val()+" "+$('[name=hora]').val(),"DD/MM/YYYY HH:mm");

  Partes.update(this._id, {$set: {
                        fecha: fecha.format(),
                        gravedad: $('input[name="options"]:checked', e.target).val(),
                        comentario: $(e.target).find('[name=comentario]').val()}});
  Router.go('partePagina', {_id: this._id});
  }

});
