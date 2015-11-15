Template.cursoNuevo.events({
  'click .tutorElemento': function(event) {
      nuevo_tutor=$(event.target).attr('data-id');
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
    if (typeof nuevo_tutor === 'undefined'){
      if(!confirm("¿Esta seguro que desea crear este curso sin ningn tutor?"))
        return;
    }else {
      nuevoCurso=_.extend(nuevoCurso,{tutor:nuevo_tutor});
    }
      Cursos.insert(nuevoCurso);

    Router.go('/admin/cursos/');
  }
});
