import admin from 'firebase-admin';

export default class Queue {
  constructor(event, functionsConfig) {
    if (!event) {
      throw new Error('event is required');
    }
    if (!functionsConfig) {
      throw new Error('functions config is required');
    }
    this.event = event;
    this.ref = event.ref;
    this.config = functionsConfig;
    // TODO: Allow use of admin.credential.applicationDefault(),
    this.fb = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      ...functionsConfig.firebase,
    });
  }

  updateWithTimestamp(data, timestampName = 'completedAt') {
    return this.event.data.adminrRef.update({
      ...data,
      [timestampName]: this.fb.database.ServerValue.TIMESTAMP,
    });
  }

  start() {
    // const eventVal = this.event.data.val();
    return this.updateWithTimestamp({
      status: 'started',
    }, 'startedAt')
    .then(() => {
      // TODO: check event value has all params based on schema
      // has?
    });
  }

  error(err) {
    return this.updateWithTimestamp({
      status: 'error',
      completed: true,
      error: err || 'Error',
    });
  }

  complete() {
    return this.updateWithTimestamp({
      status: 'complete',
      completed: true,
    });
  }

  loadData() {
    // TODO: Load data based on schema
  }
}
