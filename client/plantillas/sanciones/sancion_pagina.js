Template.sancionPagina.events({
  'submit form': function(e) {
    e.preventDefault();
    if(confirm("¿Seguro que quiere borrar la sanción?")){

      sancion=Sanciones.findOne(this.sancion._id);
      busqueda={_id: {$in: sancion.partes}};
      actualizacion= {$set: {
                            sancionado: false}};
      param={busqueda:busqueda,actualizacion:actualizacion};
      Meteor.call('parteActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
          });
      Sanciones.remove(this.sancion._id);

      Router.go('/sancion/todos/');
    }
    }
});
