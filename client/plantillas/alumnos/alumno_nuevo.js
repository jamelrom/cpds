Template.alumnoNuevo.events({
  'click .cursoElemento': function(event) { //cuando se pulsa un nuevo curso se almacena en la variable nuevoCurso y se muestra el cambio al usuario
      nuevoCurso=$(event.target).attr('data-id');
       $('#curso').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.alumnoNuevo.events({
  'submit form': function(e) {
    e.preventDefault();
    if(!$('#nombre').val()){
      alert("No puede dejar el nombre del alumno en blanco");
      return;
    }
    nuevoAlumno={nombre:$('#nombre').val()};
    if (typeof nuevoCurso === 'undefined'){ //se comprueba si el dejar el alumno sin curso ha sido intencionado
      if(!confirm("¿Esta seguro que desea crear este alumno sin asignar a ningún curso?"))
        return;
    }else {
     _.extend(nuevoAlumno,{curso:nuevoCurso}); //si existe el curso del alumno se añade al objeto nuevoAlumno
    }
    //insertamos el alumno y volvemos a la lista de alumnos
    Alumnos.insert(nuevoAlumno);
    Router.go('/admin/alumnos/');
  }
});
