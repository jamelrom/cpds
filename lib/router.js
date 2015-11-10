Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'noEncontrado',
  waitOn: function() {
    if(Roles.userIsInRole(Meteor.userId(), ['jefe']))
      return [Meteor.subscribe('partes'),
              Meteor.subscribe('cursos'),
              Meteor.subscribe('alumnos'),
              Meteor.subscribe('profesores')];
    else if(Roles.userIsInRole(Meteor.userId(), ['admin']))
      return [Meteor.subscribe('cursos'),
            Meteor.subscribe('alumnos'),
            Meteor.subscribe('profesores')];
    else
      return [Meteor.subscribe('partes'),
              Meteor.subscribe('cursos'),
              Meteor.subscribe('alumnos')];
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('home');
      this.render('identificacion');
    }
  } else {
    this.next();
  }
}
Router.onRun(requireLogin,{except: ['identificacion']});
//Router.onBeforeAction(requireLogin,{except: ['identificacion']});


Router.route('/',{
  name:'home',
  template:'identificacion',
  onBeforeAction: function () {
      if (Meteor.user()) {
          if(Roles.userIsInRole(Meteor.userId(), ['jefe']))
            Router.go('partesTodos');
          else if(Roles.userIsInRole(Meteor.userId(), ['admin']))
            Router.go('adminHome');
          else
            Router.go('partesMisLista');
      }
      this.next();
    }
});

Router.route('/admin',
  {name: 'adminHome',
  template: 'adminHome',
  data: function(){return null;}
          });

Router.route('/profesores/', {
  name: 'profesoresLista',
  template: 'profesoresLista',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe','admin']))
      return {profesores: Meteor.users.find()};
    else
      return null;
    }
});
Router.route('/profesores/nuevo', {
  name: 'profesorNuevo',
  template: 'profesorNuevo',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe','admin']))
      return {profesores: Meteor.users.find()};
    else
      return null;
    }
});


  Router.route('/partes/todos',
    {name: 'partesTodos',
    template: 'partesLista',
    data: function() {
                  return {partes: Partes.find({}, {sort: {fecha: -1}})};
              }
            });

Router.route('/partes/mis',
  {name: 'partesMisLista',
  template: 'partesLista',
  data: function() {
                return {partes: Partes.find({profesor_id:Meteor.userId()}, {sort: {fecha: -1}})};
            }
          });

Router.route('/partes/cursos/:_id', {
  name: 'partesCursosCurso',
  template: 'partesLista',
  data: function() {
                return {partes: Partes.find({curso_id:this.params._id}, {sort: {fecha: -1}})};
            }
});

Router.route('/partes/cursos/', {
  name: 'partesCursosLista',
  template: 'cursosLista',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['tutor'])) {
        return {cursos: Cursos.find({tutor:Meteor.userId()})};
    }else if(loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe'])){
        return {cursos: Cursos.find()};
    }
    else
      return null;
    }
});

Router.route('/partes/profesor/:_id', {
  name: 'partesProfesor',
  template: 'partesLista',
  data: function() {
                return {partes: Partes.find({profesor_id:this.params._id}, {sort: {fecha: -1}})};
  }
});


Router.route('/partes/profesor/', {
  name: 'partesProfesoresLista',
  template: 'profesoresLista',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe']))
      return {profesores: Meteor.users.find()};
    else
      return null;
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
  data: function() {
    var loggedInUser = Meteor.user();
    var permiso=false;
    var parte=Partes.findOne(this.params._id);
    if(loggedInUser && parte.profesor_id === loggedInUser._id)
      permiso=true;
    if(loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe']))
      permiso=true;

    if(permiso)
      return parte;
    else
      return null;
  }
});

Router.route('/partes/:_id/', {
  name: 'partePagina',
  data: function() {
    var loggedInUser = Meteor.user();
    var permiso=false;
    var parte=Partes.findOne(this.params._id);
    if(loggedInUser && parte.profesor_id === loggedInUser._id)
      permiso=true;
    if(loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe']))
      permiso=true;

      var tutoria=Cursos.findOne({tutor:loggedInUser._id})
    if(loggedInUser && tutoria && tutoria._id === parte.curso_id)
      permiso=true;

    if(permiso)
      return parte;
    else
      return null;
  }
});
