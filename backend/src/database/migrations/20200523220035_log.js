
exports.up = function(knex) {
    return knex.schema.createTable("logInfo",function(table) {
        table.increments();
        table.string('info').notNullable();
        table.string('data').notNullable();
      })
   
};

exports.down = function(knex) {
    return knex.schema.dropTable('logInfo');
};
