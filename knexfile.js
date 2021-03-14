require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations: {
      directory: __dirname + '/data/migrations'
    },
    seeds: {
      directory: __dirname + '/data/seeds'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
  },

  testing: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  }
}
