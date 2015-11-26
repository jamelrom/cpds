Template.registerHelper('quegrave', function(texto){
    return this.gravedad === texto; //comprueba si la gravedad de es la que le hemos pasado como parametro
  })
  //funciones de formateado de fechas
Template.registerHelper('fechaYHoraFormateada',function(texto){
  return moment(texto).format("DD/MM/YYYY HH:mm");
})
Template.registerHelper('fechaFormateada',function(texto){
  return moment(texto).format("DD/MM/YYYY");
})
Template.registerHelper('horaFormateada',function(texto){
  return moment(texto).format("HH:mm");
})
