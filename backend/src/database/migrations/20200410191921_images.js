
exports.up = function(knex) {
  return knex.schema.createTable("images",function(table) {
    table.string("key").primary();
    table.string("name").notNullable();
    table.string("size").notNullable();
    table.string("url").notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('images');
};
