
exports.up = function(knex) {
    return knex.schema.createTable('force-users', tbl => {
        tbl.increments();
    
        tbl.string('name', 255).notNullable();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('force-users')
};
