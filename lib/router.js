Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'noEncontrado',
  waitOn: function() {
    if(Roles.userIsInRole(Meteor.userId(), ['jefe'])) //el jefe y administrador tienen accesibles todas las colecciones
      return [Meteor.subscribe('partes'),
              Meteor.subscribe('cursos'),
              Meteor.subscribe('alumnos'),
              Meteor.subscribe('profesores'),
              Meteor.subscribe('sanciones')];
    else if(Roles.userIsInRole(Meteor.userId(), ['admin']))
      return [Meteor.subscribe('partes'),
              Meteor.subscribe('cursos'),
              Meteor.subscribe('alumnos'),
              Meteor.subscribe('profesores'),
              Meteor.subscribe('sanciones')];
    else //el resto solo los partes, cursos y alumnos con las restricciones que se han establecido en las publicaciones.
      return [Meteor.subscribe('partes'),
              Meteor.subscribe('cursos'),
              Meteor.subscribe('alumnos')];
  }
});

//redirigimos todos los acceso sin identificar a la ruta home.
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
Router.route('/admin/alumnos/', {
  name: 'alumnosLista',
  template: 'alumnosLista',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return {alumnos: Alumnos.find()};
    else
      return null;
    }
});
Router.route('/admin/alumnos/nuevo', {
  name: 'alumnoNuevo',
  template: 'alumnoNuevo',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return  {cursos:Cursos.find()};
    else
      return null;
    }
});

Router.route('/admin/alumnos/:_id', {
  name: 'alumnoEditar',
  template: 'alumnoEditar',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return  {alumno:Alumnos.findOne({_id:this.params._id}),
              cursos:Cursos.find()};
    else
      return null;
    }
});

Router.route('/admin/profesores/', {
  name: 'profesoresLista',
  template: 'profesoresLista',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return {profesores: Meteor.users.find()};
    else
      return null;
    }
});
Router.route('/admin/profesores/nuevo', {
  name: 'profesorNuevo',
  template: 'profesorNuevo',
  data: function() {
      return null;
    }
});

Router.route('/admin/profesores/:_id', {
  name: 'profesorEditar',
  template: 'profesorEditar',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return  Meteor.users.findOne({_id:this.params._id});
    else
      return null;
    }
});

Router.route('/admin/cursos/', {
  name: 'cursosLista',
  template: 'cursosLista',
  data: function() {
    var loggedInUser = Meteor.user();
    if(loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
        return {cursos: Cursos.find()};
    else
      return null;
    }
});

Router.route('/admin/cursos/nuevo', {
  name: 'cursoNuevo',
  template: 'cursoNuevo',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return  {profesores:Meteor.users.find({roles: ['tutor']})};
    else
      return null;
    }
});

Router.route('/admin/cursos/:_id', {
  name: 'cursoEditar',
  template: 'cursoEditar',
  data: function() {
    var loggedInUser = Meteor.user();

    if (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']))
      return  {curso:Cursos.findOne({_id:this.params._id}),
              profesores:Meteor.users.find({roles: ['tutor']})};
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

Router.route('/sancion/todos',
  {name: 'sancionesTodos',
  template: 'sancionesLista',
  data: function() {
                return {sanciones: Sanciones.find({}, {sort: {fechainicio: -1}})};
            }
          });
  Router.route('/sancion/cursos/:_id', {
    name: 'sancionCursosCurso',
    template: 'sancionesLista',
    data: function() {
                  return {sanciones: Sanciones.find({curso_id:this.params._id}, {sort: {fechainicio: -1}})};
              }
  });

  Router.route('/sancion/cursos/', {
    name: 'sancionCursosLista',
    template: 'cursosLista',
    data: function() {
      var loggedInUser = Meteor.user();

      if(loggedInUser && Roles.userIsInRole(loggedInUser, ['jefe'])){
          return {cursos: Cursos.find()};
      }
      else
        return null;
      }
  });
Router.route('/sancion/nueva/:_idcurso/:_idalumno', {
  name: 'sancionNuevaCursoAlumno',
  data: function() {
                return {curso: Cursos.findOne({_id:this.params._idcurso}),
                       alumno: Alumnos.findOne({_id:this.params._idalumno}),
                        partes: Partes.find({$and: [{alumno_id:this.params._idalumno}, {sancionado:false}]})};
            }
});
Router.route('/sancion/nueva/:_id', {
  name: 'sancionNuevaCurso',
  data: function() {
                //creamos un array con todos los id de alumnos que tienen partes no sancionados
                todosAlumnoId=Partes.find({sancionado:false}).map(function (parte) {
                      return parte.alumno_id;
                  });
                  //y devolvemos los alumnos del curso actual y que tienen partes, asi quitamos los alumnos sin Partes
                  //ya que no pueden sen sancionados
                return { alumnos: Alumnos.find({$and: [{curso:this.params._id}, {_id: {$in: todosAlumnoId}}]})};
            }
});
Router.route('/sancion/nueva/', {
  name: 'sancionNueva',
  data: function() {
      //mostramos solos los cursos que tienen alumnos con partes
                todosCursosId=Partes.find().map(function (parte) {
                      return parte.curso_id;
                  });
                return { cursos: Cursos.find({_id: {$in: todosCursosId}})};
            }
});

Router.route('/sancion/:_id/edit', {
  name: 'sancionPaginaEditar',
  data: function() {
    var loggedInUser = Meteor.user();
    if(!loggedInUser || !Roles.userIsInRole(loggedInUser, ['jefe']))
      return null;

    sancion=Sanciones.findOne(this.params._id);
    return {sancion: sancion,
            partes: Partes.find({_id: {$in: sancion.partes}}),
            otrospartes: Partes.find({$and: [{alumno_id:sancion.alumno_id}, {sancionado:false}]})};
  }
});

Router.route('/sancion/:_id/', {
  name: 'sancionPagina',
  data: function() {
    var loggedInUser = Meteor.user();
    if(!loggedInUser || !Roles.userIsInRole(loggedInUser, ['jefe']))
      return null;

    sancion=Sanciones.findOne(this.params._id);
    return {sancion: sancion,
            partes: Partes.find({_id: {$in: sancion.partes}})};
  }
});
