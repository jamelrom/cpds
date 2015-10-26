//publicaciones condicionales http://stackoverflow.com/questions/14074434/how-do-you-conditionally-send-data-to-the-client-in-meteor

Meteor.publish('partes', function() {
    var user = Meteor.users.findOne(this.userId);

    if (user && (user.profile.perfil === 'Jefe Estudios' || user.profile.perfil === 'admin'))
      return Partes.find();
    else if (user)
      return Partes.find({profesor_id: this.userId});

});
