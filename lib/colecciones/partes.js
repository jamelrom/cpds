Partes = new Mongo.Collection('partes');

Partes.allow({
  insert: function(userId, doc) {//todos los usuarios pueden introducir partes
    return !! userId;
  }
});

Meteor.methods({
  parteInsertar: function(parteParametro) {
    check(Meteor.userId(), String);
    //comprobamos que los parámetros que nos han pasado son cadenas de texto
    check(parteParametro, {
      curso_id: String,
      curso: String,
      alumno_id: String,
      alumno: String,
      profesor_id: String,
      profesor: String,
      gravedad: String,
      comentario: String
    });

    var parteId = Partes.insert(parteParametro);

    return {
      _id: parteId
    };
  }
});
