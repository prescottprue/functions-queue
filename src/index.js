import admin from 'firebase-admin'

export default class Queue {
  constructor (event, functionsConfig) {
    this.event = event
    this.ref = event.ref
    this.config = functionsConfig
    this.fb = admin.initializeApp(functionsConfig.firebase)
  }

  updateWithTimestamp (data, timestampName = 'completedAt') {
    return this.event.data.adminrRef.update({
      ...data,
      [timestampName]: firebase.database.ServerValue.TIMESTAMP
    })
  }

  start () {
    const eventVal = this.event.data.val()
    return this.updateWithTimestamp({
      status: 'started'
    }, 'startedAt')
    .then(() => {
      // TODO: check event value has all params based on schema
      // has?
    })
  }

  error (err) {
    return this.updateWithTimestamp({
      status: 'error',
      completed: true,
      error: err || 'Error'
    })
  }

  complete () {
    return this.updateWithTimestamp({
      status: 'complete',
      completed: true
    })
  }

  loadData () {
    // TODO: Load data based on schema
  }
}
