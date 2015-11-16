var Schemas = {};

Schemas.Sancion = new SimpleSchema({
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
    comentario: {
        type: String,
        label: "Comentario"
    },
    partes: {
      type:  [String],
      label: "Partes"
    },
    dias:{
      type: Number,
      label: "Número de días",
      min: 0
    },
    fechainicio:{
        type: String,
        label: "Fecha Inicio"
    },
    fechafin:{
        type: String,
        label: "Fecha Fin"
    }
});
Sanciones = new Mongo.Collection('sanciones');
Sanciones.attachSchema(Schemas.Sancion);

sancionPuedeEditar= function(userId, doc){
  if(userId && (Roles.userIsInRole(userId, ['jefe','admin'])))
    return true;
  else
    return false
}

Sanciones.allow({
  insert: sancionPuedeEditar,
  update: sancionPuedeEditar,
  remove: sancionPuedeEditar,
});

Meteor.methods({
  sancionActualizar: function(param){
    userId=Meteor.userId();

    if(!userId || !(Roles.userIsInRole(userId, ['admin'])))
      throw new Meteor.Error('el usuario no esta autorizado a realizar esta acción');
    Sancion.update(param.busqueda,param.actualizacion,{multi:true});

  }
});
