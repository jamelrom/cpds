
//estos datos se insertan cuando la bbdd esta vacia y son unos datos de prueba
if (Meteor.users.find().count() === 0) {
  var usuarios = [
      {nombre:"Administrador",usuario:"admin",contrasenia:"admin",roles:['admin']},
      {nombre:"Fran Melendo",usuario:"fran",contrasenia:"fran",roles:['tutor']},
      {nombre:"Virginia Milan",usuario:"virgi",contrasenia:"virgi",roles:['tutor']},
      {nombre:"Marisa González",usuario:"marisa",contrasenia:"marisa",roles:['profesor']},
      {nombre:"Jefe Estudios",usuario:"jefe",contrasenia:"jefe",roles:['jefe']}
    ];
    var cursos=[
      {curso:"1º ESO A",tutor:"fran"},
      {curso:"1º ESO B", tutor:"virgi"}
    ];
    var alumnos=[
      {nombre:"Ermenegildo Perez Romero",curso:"1º ESO A"},
      {nombre:"Francisco Gómez Gonzalez",curso:"1º ESO A"},
      {nombre:"Antonio Carmona Pérez",curso:"1º ESO B"},
      {nombre:"Saray González Fernández",curso:"1º ESO B"}
    ];
    var partes=[
      {curso: '1º ESO A', alumno:"Francisco Gómez Gonzalez",fecha:"2015-11-05T11:30:00+01:00", profesor: 'fran',gravedad: 'Leve',comentario: 'El niño ha tirado un papel al suelo'},
      {curso: '1º ESO A', alumno:"Ermenegildo Perez Romero",fecha:"2015-11-06T12:54:00+01:00", profesor: 'virgi',gravedad: 'Grave',comentario: 'El niño ha tirado un papel a la cara del compañero'},
      {curso: '1º ESO B', alumno:"Antonio Carmona Pérez",fecha:"2015-11-04T12:54:00+01:00", profesor: 'fran',gravedad: 'Grave',comentario: 'Ha tirado un avión de papel en la clase'},
      {curso: '1º ESO B', alumno:"Antonio Carmona Pérez",fecha:"2015-11-03T12:54:00+01:00", profesor: 'virgi',gravedad: 'Muy Grave',comentario: 'Ha pegado un puñetazo a otro alumno'},
      {curso: '1º ESO B', alumno:"Saray González Fernández",fecha:"2015-11-01T12:54:00+01:00", profesor: 'fran',gravedad: 'Leve',comentario: 'No ha traido las tareas de casa'},
      {curso: '1º ESO A', alumno:"Ermenegildo Perez Romero",fecha:"2015-11-02T12:54:00+01:00", profesor: 'fran',gravedad: 'Grave',comentario: 'Ha insultado al profesor'}
    ];
    var sanciones=[
      {curso: "1º ESO A",
      alumno: "Ermenegildo Perez Romero",
      comentario: "Este alumno va a estar limpiando el patio 2 semanas",
      partes: [1,5],
      dias: 4,
      fechainicio:   "2015-11-04T00:00:00+01:00",
      fechafin: "2015-11-21T00:00:00+01:00"}
    ];

//AÑADIR USUARIO
  for (i = 0; i < usuarios.length; i++) {
    usuarios[i].id = Accounts.createUser({
      username: usuarios[i].usuario,
      password: usuarios[i].contrasenia,
      profile: { name: usuarios[i].nombre }
    });
    if (usuarios[i].roles.length > 0) {
      Roles.addUsersToRoles(usuarios[i].id,usuarios[i].roles);
    }
  }
//CURSOS
  for (i = 0; i < cursos.length; i++) {
    cursos[i].id=Cursos.insert({
      curso: cursos[i].curso,
      tutor: Meteor.users.findOne({username:cursos[i].tutor})._id
    });

  }

//ALUMNOS
  for (i = 0; i < alumnos.length; i++) {
    Alumnos.insert({
      nombre: alumnos[i].nombre,
      curso: Cursos.findOne({curso:alumnos[i].curso})._id
    });
  }
//PARTES
  for (i = 0; i < partes.length; i++) {
    Partes.insert({
        curso_id: Cursos.findOne({curso:partes[i].curso})._id,
        curso: partes[i].curso,
        alumno_id: Alumnos.findOne({nombre: partes[i].alumno})._id,
        alumno: partes[i].alumno,
        profesor_id: Meteor.users.findOne({username:partes[i].profesor})._id,
        profesor: Meteor.users.findOne({username:partes[i].profesor}).profile.name,
        gravedad: partes[i].gravedad,
        comentario: partes[i].comentario,
        fecha: partes[i].fecha,
        sancionado:false
      });
  }
//SANCIONES
for (i = 0; i < sanciones.length; i++) {
  tmp=[];
  for(j=0;j<sanciones[i].partes.length; j++){
    var idparte=Partes.find().fetch()[sanciones[i].partes[j]]._id;
    tmp.push(idparte);
    Partes.update(idparte, {$set :{sancionado:true}});
  }


  Sanciones.insert({
      curso_id: Cursos.findOne({curso:sanciones[i].curso})._id,
      curso: partes[i].curso,
      alumno_id: Alumnos.findOne({nombre: sanciones[i].alumno})._id,
      alumno: sanciones[i].alumno,
      comentario: sanciones[i].comentario,
      dias: sanciones[i].dias,
      fechainicio: sanciones[i].fechainicio,
      fechafin: sanciones[i].fechafin,
      partes: tmp
    });
}

}
