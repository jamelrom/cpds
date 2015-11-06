var Schemas = {};

Schemas.Parte = new SimpleSchema({
    curso_id: {
        type: String,
        label: "Curso Id"
    },
    curso: {
        type: String,
        label: "Curso"
    },
    alumno_id: {
        type: String,
        label: "Alumno Id"
    },
    alumno: {
        type: String,
        label: "Alumno"
    },
    profesor_id: {
        type: String,
        label: "Profesor Id"
    },
    profesor: {
        type: String,
        label: "Profesor"
    },
    gravedad: {
        type: String,
        label: "Gravedad"
    },
    comentario: {
        type: String,
        label: "Comentario"
    },
});





Partes = new Mongo.Collection('partes');


Partes.attachSchema(Schemas.Parte);

Partes.allow({
  insert: function(userId, doc) {//todos los usuarios pueden introducir partes
    return !! userId;
  }
});

Meteor.methods({
  parteInsertar: function(parteParametro) {
    check(Meteor.userId(), String);
    //comprobamos que los parámetros que nos han pasado son cadenas de texto
    /*innecesario con collection2
    check(parteParametro, {
      curso_id: String,
      curso: String,
      alumno_id: String,
      alumno: String,
      profesor_id: String,
      profesor: String,
      gravedad: String,
      comentario: String
    });*/

    var parteId = Partes.insert(parteParametro);

    return {
      _id: parteId
    };
  }
});
