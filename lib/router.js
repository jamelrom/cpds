Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'noEncontrado',
  waitOn: function() { return [Meteor.subscribe('partes'),
                        Meteor.subscribe('cursos'),
                      Meteor.subscribe('alumnos')];}
});




var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('identificacion');
    }
  } else {
    this.next();
  }
}
Router.onRun(requireLogin,{except: ['identificacion']});
Router.onBeforeAction(requireLogin,{except: ['identificacion']});


Router.route('/',{
  name:'home',
  template:'identificacion'});

Router.route('/partes/mis',
  {name: 'partesMisLista',
  template: 'partesLista',
  data: function() {
                return {partes: Partes.find({profesor_id:Meteor.userId()},{sort: {date_created: -1}})};
            }
          });

Router.route('/partes/cursos/:_id', {
  name: 'partesCursosCurso',
  template: 'partesLista',
  data: function() {
                return {partes: Partes.find({curso_id:this.params._id})};
            }
});

Router.route('/partes/cursos/', {
  name: 'partesCursosLista',
  template: 'cursosLista',
  data: function() {
                return {cursos: Cursos.find({tutor:Meteor.userId()})};
            }
});

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

Router.route('/partes/:_id/edit', {
  name: 'partePaginaEditar',
  data: function() { return Partes.findOne(this.params._id); }
});

Router.route('/partes/:_id', {
  name: 'partePagina',
  data: function() { return Partes.findOne(this.params._id); }
});

/*var requiereIdentificacion = function() {
  if (! Meteor.user()) {
    this.render('identificacion');
  } else {
    this.next();
  }
}


Router.onBeforeAction(requiereIdentificacion, {only: 'partesLista'});*/



//Router.onBeforeAction('dataNotFound');//, {only: 'partePagina'});
