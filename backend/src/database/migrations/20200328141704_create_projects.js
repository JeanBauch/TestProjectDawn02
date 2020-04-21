
exports.up = function(knex) {
    return knex.schema.createTable('projects',function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('data').notNullable();
        table.string('team_id').notNullable();  // Relacionamento
        table.foreign('team_id').references('id').inTable('teams'); // Chave estrangeira
        table.string('url').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
