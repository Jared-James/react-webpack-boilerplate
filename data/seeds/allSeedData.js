
exports.seed = async knex => {
  try {
    //deletes data
    await knex('movie').del()
    await knex('users').del()
  
    //inserts data
    await knex('users').insert([
      { id: 1, username: 'brie', password: 'shit' },
      { id: 2, username: 'jared', password: 'shit' },
      { id: 3, username: 'nate', password: 'shit' }
    ]);
    await knex('movie').insert([
      { id: 1, movieName: 'runescape', rating: 2, users_id: 1 },
      { id: 2, movieName: 'Bob the builder', rating: 2, users_id: 1 },
      { id: 3, movieName: 'iphoneX', rating: 2, users_id: 1 },
      { id: 4, movieName: 'AsusMonitor', rating: 2, users_id: 1 },
      { id: 5, movieName: 'world of warcraft', rating: 2, users_id: 2 },
      { id: 6, movieName: 'league of legends', rating: 2, users_id: 3},

    ]);
  } catch (e) {
    console.log('error in seeding', e)
  }
};

