Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'noEncontrado',
  waitOn: function() { return [Meteor.subscribe('partes'),
                        Meteor.subscribe('cursos'),
                      Meteor.subscribe('alumnos')];}
});


Router.route('/', {name: 'partesLista'});
Router.route('/cursos/', {name: 'cursosLista'});
Router.route('/partes/nuevo/:_idcurso/:_idalumno', {
  name: 'partesNuevoCursoAlumno',
  data: function() {
                return {curso: Cursos.findOne({_id:this.params._idcurso}),
                       alumno: Alumnos.findOne({_id:this.params._idalumno})};
            }
});
Router.route('/partes/nuevo/:_id', {
  name: 'partesNuevoCurso',
  data: function() {
                return { alumnos: Alumnos.find({curso:this.params._id})};
            }
});
Router.route('/partes/nuevo/', {
  name: 'partesNuevo',
  data: function() {
                return { cursos: Cursos.find()};
            }
});

Router.route('/partes/:_id', {
  name: 'partePagina',
  data: function() { return Partes.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'partePagina'});
