const { v4: uuidv4 } = require('uuid')

exports.seed = async knex => {
  try {
    //deletes data
    await knex('users').del()
    await knex('movie').del()




    //inserts data
    await knex('users').insert([
      { id: uuidv4(), username: 'brie', password: 'shit' },
      { id: uuidv4(), username: 'jared', password: 'shit' },
      { id: uuidv4(), username: 'nate', password: 'shit' }
    ])

    let result = await knex('users')
    let jared = result[0].id
    let brie = result[1].id
    let nate = result[2].id
    console.log({
      nate: nate,
      jared: jared,
      brie: brie
    })


    await knex('movie').insert([
      { id: uuidv4(), movieName: 'runescape', rating: 2, users_id: jared },
      { id: uuidv4(), movieName: 'Bob the builder', rating: 2, users_id: jared },
      { id: uuidv4(), movieName: 'iphoneX', rating: 2, users_id: jared },
      { id: uuidv4(), movieName: 'AsusMonitor', rating: 2, users_id: brie },
      { id: uuidv4(), movieName: 'world of warcraft', rating: 2, users_id: brie },
      { id: uuidv4(), movieName: 'league of legends', rating: 2, users_id: nate}

    ]);
  } catch (e) {
    console.log('error in seeding', e)
  }
};

