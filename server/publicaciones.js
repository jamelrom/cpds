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

//Esta publicación es especial, por especificación, solo el jefe de estudios o el administrador de la aplicación tienen acceso
//a todos los partes, el resto de usuario solo tienen acceso a sus propios partes, y a los de su tutoria si es que son tutores.
Meteor.publish('partes', function() {
    var user = Meteor.users.findOne(this.userId);

    if (user && (user.profile.perfil === 'Jefe Estudios' || user.profile.perfil === 'admin'))
      return Partes.find();
    else if (user && (user.profile.perfil === 'tutor')){
      tutoria= Cursos.findOne({tutor: this.userId});
      return Partes.find({curso_id: tutoria._id});
    }
    else if(user)
      return Partes.find({profesor_id: this.userId});


});
/*publicaciones parciales
return Posts.find({}, {fields: {
    date: false
  }});
  */
