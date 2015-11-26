Template.cursoNuevo.events({
  'click .tutorElemento': function(event) {
      nuevo_tutor=$(event.target).attr('data-id');//guardamos el id del nuevo tutor en esta variable
       $('#tutor').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.cursoNuevo.events({
  'submit form': function(e) {
    e.preventDefault();
    if(!$('#nombre').val()){
      alert("No puede dejar el nombre del curso en blanco");
      return;
    }
    nuevoCurso={curso:$('#nombre').val()};
    if (typeof nuevo_tutor === 'undefined'){ //comprobamos que realmente quiere crear el curso sin tutor
      if(!confirm("¿Esta seguro que desea crear este curso sin ningún tutor?"))
        return;
    }else {
      nuevoCurso=_.extend(nuevoCurso,{tutor:nuevo_tutor});//añadimos al objeto el tutor
    }
      Cursos.insert(nuevoCurso); 

    Router.go('/admin/cursos/');
  }
});
