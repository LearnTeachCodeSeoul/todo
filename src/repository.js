const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/test'

class Repository {
  findTasks (callback) {
    console.log('findTasks')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('tasks').find({}).toArray((err, tasks) => {
        if (err) return console.error('Failed to find tasks.', err)
        callback(tasks)
      })
    })
  }

  addTask (task, callback) {
    console.log('addTask')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').insertOne(task, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback(result.ops[0]._id)
      })
    })
  }

  deleteTask (id, callback) {
    console.log('deleteTask')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').deleteOne({_id: new ObjectID(id)}, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback()
      })
    })
  }

  deleteSelectedTasks (arr, callback) {
    console.log('deleteSelectedTasks')
  }

  deleteAllTasks (callback) {
    console.log('deleteAllTasks')
  }
}

module.exports = Repository
