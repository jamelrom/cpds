//publicaciones condicionales http://stackoverflow.com/questions/14074434/how-do-you-conditionally-send-data-to-the-client-in-meteor

//los cursos y alumnos se publican a todos los usuarios, ya que todos los profesores deben poder tener acceso
//a todos los alumnos del centro, para poder en un momento dado imponerles un parte
Meteor.publish('cursos',function(){
  var user = Meteor.users.findOne(this.userId);
  if(user)
    return Cursos.find();
});

Meteor.publish('alumnos',function(){
  var user = Meteor.users.findOne(this.userId);
  if(user)
    return Alumnos.find();
});

//Esta publicación es especial, por especificación, solo el jefe de estudios tienen acceso
//a todos los partes, el resto de usuario solo tienen acceso a sus propios partes, y a los de su tutoria si es que son tutores.
Meteor.publish('partes', function() {
    var user = Meteor.users.findOne(this.userId);

    if (user && Roles.userIsInRole(user, ['jefe','admin']))
      return Partes.find();
    else if (user && Roles.userIsInRole(user, ['tutor'])){
      tutoria= Cursos.findOne({tutor: this.userId});
      if(tutoria) //el administrador puede haber asignado a un profesor como tutor, y aún no haberle asignado una tutoría, en ese caso esta busqueda en la base de datos fallará
        return Partes.find({$or: [{curso_id: tutoria._id},{profesor_id:this.userId}]});
      else
          return Partes.find({profesor_id:this.userId});

    }
    else if(user)
      return Partes.find({profesor_id: this.userId});


});

Meteor.publish('profesores', function() {
    var user = Meteor.users.findOne(this.userId);

    if (user && Roles.userIsInRole(user, ['jefe','admin']))
      return Meteor.users.find();
});
/*publicaciones parciales
return Posts.find({}, {fields: {
    date: false
  }});
  */
