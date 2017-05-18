import mysql from 'mysql'
import su from 'superagent'

export const Query = (num) => {
  const connection = mysql.createConnection(process.env.SQL_HOST)
  return new Promise((resolve, reject) => {
    connection.query('SELECT uuid FROM Phones WHERE phone = ?', num, (error, results, fields) => {
      connection.destroy()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export const GetFBInfo = (userId, FB) => {
  return new Promise((resolve, reject) => {
    su.get('https://graph.facebook.com/v2.6/' + userId)
    .query({fields: 'first_name,last_name,locale,gender', access_token: FB})
    .end((err, res) => {
      if (err) resolve(null)
      else {
        if (res.status === 200) {
          resolve(JSON.parse(res.text))
        } else {
          resolve(null)
        }
      }
    })
  })
}

export const deleteConv = (convId) => {
  su
    .delete(`https://api.recast.ai/v2/converse`)
    .send({ conversation_token: convId })
    .set('Authorization', `Token ${process.env.REQUEST_TOKEN}`)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
    })
}

export const modConv = (convId, memory) => {
  su
    .put(`https://api.recast.ai/v2/converse`)
    .send({ conversation_token: convId })
    .send({memory: memory})
    .set('Authorization', `Token ${process.env.REQUEST_TOKEN}`)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
    })
}
