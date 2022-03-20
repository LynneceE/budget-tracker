// create db connection

let db;

//  call database 'budget' , connect to IndexedDB, seet to version 1
const request = indexedDB.open('budget', 1);

// updares if db version changes
request.onupgradeneeded = function(event) {
    const db = event.target.result;
// create new table, auto increment
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// if successful request
request.onsuccess = function(event) {
    db = event.target.result;

    // check if app is online , if yes the run uploadTransaction()
    if (navigator.online) {
                        // i'll add uploadTransaction() here
        uploadTransaction();                

    }
};
// if unsuccessful show the error
request.onerror = function(event) {
    console.log(event.target.errorCode);
};

                                                 // SAVE BUDGET DATA

 // execute this function if user attempts a new transaction   w/o internet connection                                             
function saveRecord(record) {
    //oopen new transaction
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    // accesss object store for new_transaction
    const budgetObjectStore = transaction.objectStore('new_transaction');
    // add recored to store
    budgetObjectStore.add(record);
}


// uploadTransaction ()
function uploadTransaction () {
    // open transaction on the database
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // access object store
    const budgetObjectStore = transaction.objectStore('new_transaction');

    // get all records from store and set to a variable
    const getAll = budgetObjectStore.getAll();



    getAll.onsuccess = function() {
        // take any data that may be in indexedDB and send it to the server
        if (getAll.result.length > 0) {
          fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(serverResponse => {
              if (serverResponse.message) {
                throw new Error(serverResponse);
              }
    
              const transaction = db.transaction(['new_transaction'], 'readwrite');
              const pizzaObjectStore = transaction.objectStore('new_transaction');
              // clear the store
              pizzaObjectStore.clear();
            })
            .catch(err => {
              // set reference to redirect back here
              console.log(err);
            });
        }
      };
}

// listen for the app to come back online
window.addEventListener('online', uploadTransaction);