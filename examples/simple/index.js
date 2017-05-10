const Queue = require('functions-queue');

exports.pdfGenerate = functions.database.ref('/messages/{pushId}/original')
  .onWrite(event => {
    const service = new Microservice(event)
    return service
      .start() // mark as started with timestamp
      .then(() => {
        // do some work
        service.progress(10) // set progress along the way
        return someAction
          .then((res) => service.resolve(res))
          .catch((err) => service.reject(err))
         // reject if an error is hit (errors written to firebase)
      })
  })
});
