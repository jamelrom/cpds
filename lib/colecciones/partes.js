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
    fecha:{
        type: String,
        label: "Fecha y Hora"
    }
});
Partes = new Mongo.Collection('partes');
Partes.attachSchema(Schemas.Parte);

partePuedeEditar= function(userId, doc){
  if(userId && (Roles.userIsInRole(userId, ['jefe','admin']) || doc.profesor_id===userId))
    return true;
  else
    return false
}

Partes.allow({
  insert: function(userId, doc) {//todos los usuarios pueden introducir partes
    return !! userId; //el operador !! devuelve true si contiene algo la variable
  },
  update: partePuedeEditar,
  remove: partePuedeEditar
});

Meteor.methods({
  parteInsertar: function(parteParametro) {
    check(Meteor.userId(), String);

    var parteId = Partes.insert(parteParametro);

    return {
      _id: parteId
    };
  },
  parteActualizar: function(param){
    userId=Meteor.userId();
    //throw new Meteor.Error('yiaaaaaaaa');

    if(!userId || !(Roles.userIsInRole(userId, ['admin'])))
      throw new Meteor.Error('el usuario no esta autorizado a realizar esta acción');
    Partes.update(param.busqueda,param.actualizacion,{multi:true});
    //console.log(param.busqueda+" "+param.actualizacion);

  }
});
