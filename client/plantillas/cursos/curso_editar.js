Template.cursoEditar.rendered= function(){
  //cuando se carga la página asignamos a la variable tutor el tutor, y mostramos dicho tutor en el dropdown
  tutor=Meteor.users.findOne(this.data.curso.tutor);
  $('#tutor').html(tutor.profile.name+ "<span class='caret'></span>");
};

Template.cursoEditar.events({
  'click .tutorElemento': function(event) {
    //cuando se pulsa en un nuevo tutor, se almacena en la variable nuevo tutor su id y se muestra al usuario
      nuevo_tutor=$(event.target).attr('data-id');
       $('#tutor').html($(event.target).text()+ "<span class='caret'></span>");
      }
});

Template.cursoEditar.events({
  'submit form': function(e) {
    e.preventDefault();

    if(!$('#nombre').val()){
      alert("No puede dejar el nombre del curso en blanco");
      return;
    }
    if(this.curso.curso!=$('#nombre').val()){

      Cursos.update(this.curso._id,{$set: {curso:$('#nombre').val()}});

      //ademas de actualizar la colección cursos, tenemos que actualizar todos los partes y Sanciones
      //que tengan dicho curso en sus documentos
      busqueda={curso_id:this.curso._id};
      actualizacion= {$set: {
                            curso: $('#nombre').val()}};
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
    if (typeof nuevo_tutor != 'undefined')
      //si hay un nuevo tutor lo actualizamos
      Cursos.update(this.curso._id,{$set: {tutor:nuevo_tutor}});

    Router.go('/admin/cursos/');//volvemos al listado de cursos
  
},
  'click .borrar':function(e) {
      e.preventDefault();

      if(!confirm("¿Esta seguro que desea eliminar este curso?"))
        return;

      if(Alumnos.findOne({curso:this.curso._id})){
        alert("No puede borrar un curso que contiene alumnos");
        return;
      }
      //Despues de comprobar que el usuario esta seguro y que dicho curso no contiene alumnos borramos el curso, informamos al usuario y volvemos al listado de cursos
      Cursos.remove(this.curso._id);
      alert("Curso borrado con éxito");
      Router.go('/admin/cursos/');
  }

});
