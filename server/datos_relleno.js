if (Meteor.users.find().count() === 0) {
  var jefeid = Meteor.users.insert({
    username: 'jefe',
    profile: { nombre: 'Jefe', perfil:'Jefe Estudios' }
  });
  Accounts.setPassword(jefeid, 'jefe');
}

if(Partes.find().count() === 0) {
    Partes.insert({
      curso_id: '1',
      curso: '1º ESO A',
      alumno_id: '1',
      alumno: 'Francisco Gómez Gonzalez',
      profesor_id: '1',
      profesor: 'Francisco Javier Melendo Roman',
      gravedad: 'leve',
      comentario: 'El niño ha tirado un papel al suelo'
    });

    Partes.insert({
      curso_id: '1',
      curso: '1º ESO B',
      alumno_id: '1',
      alumno: 'Antonia Garcia Gonzalez',
      profesor_id: '1',
      profesor: 'Rosa Calvo',
      gravedad: 'grave',
      comentario: 'El niño ha tirado un papel a la cara del compañero'
    });

    Partes.insert({
      curso_id: '1',
      curso: '2º ESO A',
      alumno_id: '1',
      alumno: 'Ermenegildo Parras',
      profesor_id: '1',
      profesor: 'Marisa Perula',
      gravedad: 'muy grave',
      comentario: 'El niño ha pegado a lotro compañero'
    });
}
