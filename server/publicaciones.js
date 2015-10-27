//publicaciones condicionales http://stackoverflow.com/questions/14074434/how-do-you-conditionally-send-data-to-the-client-in-meteor
Meteor.publish('cursos',function(){
  return Cursos.find();
});

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
