import mysql from 'mysql'
import su from 'superagent'
import crypto from 'crypto'
import * as admin from 'firebase-admin'

const fire = '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'

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

export const getFireResult = (number) => {
  return new Promise((resolve, reject) => {
    try {
      const decipher = crypto.createDecipher(process.env.MYHASH, process.env.PRIVATE)
      var key = decipher.update(fire, 'base64', 'utf8')
      key += decipher.final('utf8')
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT,
          clientEmail: process.env.MAIL,
          privateKey: key
        }),
        databaseURL: process.env.FIREBASE_URL
      })
      const db = admin.database()
      const ref = db.ref('/')
      ref.child('Phones').child(number).on('value', (snapshot) => {
        resolve(snapshot.val())
      }, (errorObject) => {
        reject('The read failed: ' + errorObject.code)
      })
    } catch (e) {
      reject(e)
    }
  })
}
