
exports.up = function(knex) {
  return knex.schema.createTable("images",function(table) {
    table.string("key").primary();
    table.string("name").notNullable();
    table.string("size").notNullable();
    table.string("url").notNullable();
    table.string("project").notNullable();
    table.foreign('project').references('id').inTable('projects');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('images');
};
