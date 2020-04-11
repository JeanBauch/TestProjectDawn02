
exports.up = function(knex) {
    return knex.schema.createTable('projects',function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.date('data');
        table.string('team_id').notNullable();  // Relacionamento
        table.foreign('team_id').references('id').inTable('teams'); // Chave estrangeira
        table.string('key').notNullable();
        table.foreign('key').references('key').inTable('images');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
