import db from './connect'

const connect = () => {


  db.sync({
    logging: console.log,
    force: true,
  })
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((error: any) => {
      console.error('Unable to connect to the database: ', error)
    })
}
export default connect
