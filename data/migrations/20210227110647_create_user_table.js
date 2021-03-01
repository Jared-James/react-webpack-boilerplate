
exports.up = async knex => {
    try {
        const allCreatedTables = await knex.schema.hasTable('users').createTable('users', function (table) {
            table.increments('id').primary()
            table.string('username').notNullable()
            table.string('password').notNullable()
            })
            .createTable('movie', function (table) {
                table.increments('id')
                table.string('movieName').notNullable()
                table.integer('rating')
                table.integer('users_id').references('users.id')
            })
    
        return allCreatedTables
    } catch (e) {
        console.log('Error from migrations Create user', e)
    }
}

exports.down = knex => {
    return knex.schema.dropTable('movie')
        .dropTable('users');
}