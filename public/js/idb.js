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

