Template.partePaginaEditar.rendered=function(){
  $('#fecha').datepicker({
      format: "dd/mm/yyyy",
    language: "es",
    todayBtn: "linked",
    weekStart: 1,
    autoclose: true,
    todayHighlight: true});

    $('.clockpicker').clockpicker({
      autoclose:true,
      'default':'now'
    });

    var tipo=("#"+this.data.gravedad).split(' ').join('');//le quitamos los espacios al tipo de gravedad

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
