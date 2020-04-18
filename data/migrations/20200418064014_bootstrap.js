
exports.up = function(knex) {
   return knex.schema
      .createTable('tracks', tbl => {
         tbl.increments()

         tbl
            .string('name', 255)
            .notNullable()
            .unique()
      })
      .createTable('students', tbl => {
         tbl.increments()

         tbl
            .string('name', 255)
            .notNullable()
      })
      .createTable('cohorts', tbl => {
         tbl.increments()

         tbl
            .string('name', 255)
            .notNullable()
            .unique()

         // Foreign Key that references the id in track
         tbl
            .integer('track_id')
            .unsigned()
            .notNullable()
            .refrences('id')
            .inTable('tracks')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
      })
      .createTable('student_cohorts', tbl => {
         tbl.primary(['student_id', 'cohort_id'])

         tbl
            .string('name', 255)
            .notNullable()
            .unique()

         tbl
            .integer('student_id')
            .unsigned()
            .notNullable()
            .refrences('id')
            .inTable('students')

         tbl
            .integer('cohort_id')
            .unsigned()
            .notNullable()
            .refrences('id')
            .inTable('cohorts')
      })
};

exports.down = function(knex) {
   return knex.schema
      .dropTableIfExists('student_cohorts')
      .dropTableIfExists('cohorts')
      .dropTableIfExists('students')
      .dropTableIfExists('tracks')
};
