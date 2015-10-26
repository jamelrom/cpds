if (Meteor.users.find().count() === 0) {


  var tomId = Meteor.users.insert({
    profile: { nombre: 'Jefe', perfil:'Jefe Estudios' }
  });

}
