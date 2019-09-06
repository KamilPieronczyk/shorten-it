const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.uploadScreenshot = functions.firestore.document('URLs/{docId}').onCreate((snap,context) => {
  const doc = snap.data()
  const docId = context.params.docId

  if(!doc.user) return;

  
})

