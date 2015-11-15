Template.cursoEditar.rendered= function(){
  tutor=Meteor.users.findOne(this.data.curso.tutor);
  //console.log(tutor);
  $('#tutor').html(tutor.profile.name+ "<span class='caret'></span>");
};

Template.cursoEditar.events({
  'click .tutorElemento': function(event) {
      nuevo_tutor=$(event.target).attr('data-id');
       $('#tutor').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.cursoEditar.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log(this.curso.curso+"-"+$('#nombre').val())
    if(!$('#nombre').val()){
      alert("No puede dejar el nombre del curso en blanco");
      return;
    }
    if(this.curso.curso!=$('#nombre').val()){
      Cursos.update(this.curso._id,{$set: {curso:$('#nombre').val()}});
      busqueda={curso_id:this.curso._id};
      actualizacion= {$set: {
                            curso: $('#nombre').val()}};
      param={busqueda:busqueda,actualizacion:actualizacion};
      Meteor.call('parteActualizar',param , function(error, resultado) {
            if (error)
              return alert(error.reason);
          });
    }
    if (typeof nuevo_tutor != 'undefined') {
      Cursos.update(this.curso._id,{$set: {tutor:nuevo_tutor}});
    }
    Router.go('/admin/cursos/');
  },
  'click .borrar':function(e) {
      e.preventDefault();

      if(!confirm("¿Esta seguro que desea eliminar este curso?"))
        return;

      if(Alumnos.findOne({curso:this.curso._id})){
        alert("No puede borrar un curso que contiene alumnos");
        return;
      }

      Cursos.remove(this.curso._id);
      alert("Curso borrado con éxito");
      Router.go('/admin/cursos/');
  }

});
