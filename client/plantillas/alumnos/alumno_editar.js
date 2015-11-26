Template.alumnoEditar.rendered= function(){
  curso=Cursos.findOne(this.data.alumno.curso);
  //hacemos que el curso actual del alumno aparezca en el dropdown
  $('#curso').html(curso.curso+ "<span class='caret'></span>");
};

Template.alumnoEditar.events({
  'click .cursoElemento': function(event) { //cuando se pulsa un nuevo curso se refresca el control para que apaezca como seleccionado
      nuevoCurso=$(event.target).attr('data-id'); //guardamos el id del nuevo curso, para cuando pulse el botón editar
       $('#curso').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.alumnoEditar.events({
  'submit form': function(e) {
    e.preventDefault();
    if(!$('#nombre').val()){ //si el nombre esta en blanco informamos al usuario y terminamos
      alert("No puede dejar el nombre del alumno en blanco");
      return;
    }
    if(this.alumno.nombre!=$('#nombre').val()){ //si el nombre del alumno ha cambiado cambiamos en la base de datos dicho nombre
      Alumnos.update(this.alumno._id,{$set: {nombre:$('#nombre').val()}});
      //tenemos que actualizar todos los partes con el nombre del alumno y todas las sanciones
      //este tipo de actualizaciones masivas solo pueden ser realizadas en el servidor, por tanto tenemos
      //que llamar a 2 funciones previamente definidas, a las que le pasamos el id del alumno y la asignación al nuevo valor
      busqueda={alumno_id:this.alumno._id};
      actualizacion= {$set: {
                            alumno: $('#nombre').val()}};
      param={busqueda:busqueda,actualizacion:actualizacion};
      Meteor.call('parteActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
        });
      Meteor.call('sancionActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
          });
    }
    if (typeof nuevoCurso != 'undefined') {//si se ha creado esta variable, es que el usuario ha cambiado el curso, en ese caso
      Alumnos.update(this.alumno._id,{$set: {curso:nuevoCurso}}); //cambiamos el curso del alumno y actualizamos partes y Sanciones
      //tenemos que cambiar tanto el id del curso como el nombre del curso
      busqueda={alumno_id:this.alumno._id};
      actualizacion= {$set: {
                            curso_id: nuevoCurso,
                            curso: Cursos.findOne(nuevoCurso).curso  }};
      param={busqueda:busqueda,actualizacion:actualizacion};
      Meteor.call('parteActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
        });
      Meteor.call('sancionActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
          });
    }
    //volvemos al listado de alumnos
    Router.go('/admin/alumnos/');
  },
  'click .borrar':function(e) {
      e.preventDefault();

      if(!confirm("¿Esta seguro que desea eliminar este alumno?")) //se comprueba si no ha pulsado el botón por error ya que es un cambio no reversible
        return;

      if(Partes.findOne({alumno_id:this.alumno._id})){
        alert("No puede borrar un alumno que ya contiene partes");//como mongodb no tiene integridad referencial tenemos que comprobar que no contiene ya partes
        return;
      }
      //si ha pasado las comprobaciones borramos el alumno, informamos de la acción y redirigimos al listado de alumnos
      Alumnos.remove(this.alumno._id);
      alert("Alumno borrado con éxito");
      Router.go('/admin/alumnos/');
  }

});
