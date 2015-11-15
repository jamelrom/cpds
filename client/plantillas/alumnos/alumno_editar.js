Template.alumnoEditar.rendered= function(){
  curso=Cursos.findOne(this.data.alumno.curso);
  console.log(curso+" "+this.data.alumno.curso);
  $('#curso').html(curso.curso+ "<span class='caret'></span>");
};

Template.alumnoEditar.events({
  'click .cursoElemento': function(event) {
      nuevoCurso=$(event.target).attr('data-id');
       $('#curso').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.alumnoEditar.events({
  'submit form': function(e) {
    e.preventDefault();
    if(!$('#nombre').val()){
      alert("No puede dejar el nombre del alumno en blanco");
      return;
    }
    if(this.alumno.nombre!=$('#nombre').val()){
      Alumnos.update(this.alumno._id,{$set: {nombre:$('#nombre').val()}});
      busqueda={alumno_id:this.alumno._id};
      actualizacion= {$set: {
                            alumno: $('#nombre').val()}};
      param={busqueda:busqueda,actualizacion:actualizacion};
      Meteor.call('parteActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
          });
    }
    if (typeof nuevoCurso != 'undefined') {
      Alumnos.update(this.alumno._id,{$set: {curso:nuevoCurso}});
    }
    Router.go('/admin/alumnos/');
  },
  'click .borrar':function(e) {
      e.preventDefault();

      if(!confirm("¿Esta seguro que desea eliminar este alumno?"))
        return;

      if(Partes.findOne({alumno_id:this.alumno._id})){
        alert("No puede borrar un alumno que ya contiene partes");
        return;
      }

      Alumnos.remove(this.alumno._id);
      alert("Alumno borrado con éxito");
      Router.go('/admin/alumnos/');
  }

});
