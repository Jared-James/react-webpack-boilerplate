
exports.up = async knex => {
    try {
        const allCreatedTables = await knex.schema.hasTable('users').createTable('users', function (table) {
           
            table.uuid('id').unique().notNullable().primary()
            table.string('username').notNullable()
            table.string('password').notNullable()
            })
            .createTable('movie', function (table) {
                table.uuid('id').unique().notNullable().primary()
                table.string('movieName').notNullable()
                table.integer('rating')
                table.uuid('users_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
            })
    
        return allCreatedTables
    } catch (e) {
        console.log('Error from migrations Create user', e)
    }
}

exports.down = async knex => {
    return knex.schema.dropTable('movie')
    .dropTable('users')
    
}