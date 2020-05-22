
exports.up = function(knex) {
    return knex.schema.createTable("vote",function(table) {
        table.string('id_team').notNullable();
        table.string('id_project').notNullable();
        table.foreign('id_team').references('id').inTable('teams');
        table.foreign('id_project').references('id').inTable('projects');
        table.primary(['id_team','id_project']);
        table.integer('vote').notNullable();

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('vote');
};
