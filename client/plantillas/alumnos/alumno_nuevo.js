Template.alumnoNuevo.events({
  'click .cursoElemento': function(event) {
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
    if (typeof nuevoCurso === 'undefined'){
      if(!confirm("¿Esta seguro que desea crear este alumno sin asignar a ningún curso?"))
        return;
    }else {
      nuevoCurso=_.extend(nuevoAlumno,{curso:nuevoCurso});
    }
      Alumnos.insert(nuevoAlumno);

    Router.go('/admin/alumnos/');
  }
});
