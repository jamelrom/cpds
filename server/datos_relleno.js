if (Meteor.users.find().count() === 0) {
  //PROFESORES
  var adminid = Meteor.users.insert({
    username: 'admin',
    profile: { nombre: 'Administrador', perfil:'admin' }
  });
  Accounts.setPassword(adminid, 'admin');

  var jefeid = Meteor.users.insert({
    username: 'jefe',
    profile: { nombre: 'Jefe', perfil:'Jefe Estudios' }
  });
  Accounts.setPassword(jefeid, 'jefe');

  var franid = Meteor.users.insert({
    username: 'fran',
    profile: { nombre: 'Fran Melendo', perfil:'tutor' }
  });
  Accounts.setPassword(franid, 'fran');

  var virgiid = Meteor.users.insert({
    username: 'virgi',
    profile: { nombre: 'Virginia Gonzalez', perfil:'profesor' }
  });
  Accounts.setPassword(virgiid, 'virgi');
//CURSOS
  var eso1aid= Cursos.insert({
    curso: '1º ESO A',
    tutor: franid
  });
  var eso1bid= Cursos.insert({
    curso: '1º ESO B',
    tutor: jefeid
  });
//ALUMNOS
  var alumno1=Alumnos.insert({
    nombre: 'Francisco Gómez Gonzalez',
    curso: eso1aid
  });
//PARTES
    Partes.insert({
      curso_id: eso1aid,
      curso: '1º ESO A',
      alumno_id: alumno1,
      alumno: Alumnos.findOne(alumno1).nombre,
      profesor_id: franid,
      profesor: 'Francisco Javier Melendo Roman',
      gravedad: 'Leve',
      comentario: 'El niño ha tirado un papel al suelo'
    });

    Partes.insert({
      curso_id: eso1aid,
      curso: '1º ESO B',
      alumno_id: '1',
      alumno: 'Antonia Garcia Gonzalez',
      profesor_id: 'virgiid',
      profesor: 'Virginia Gonzalez',
      gravedad: 'Grave',
      comentario: 'El niño ha tirado un papel a la cara del compañero'
    });

    Partes.insert({
      curso_id: eso1bid,
      curso: '1º ESO A',
      alumno_id: '1',
      alumno: 'Ermenegildo Parras',
      profesor_id: '1',
      profesor: 'Marisa Perula',
      gravedad: 'Muy Grave',
      comentario: 'El niño ha pegado a lotro compañero'
    });
}
