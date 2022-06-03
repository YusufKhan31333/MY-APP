import Dexie from 'dexie';


export const db = new Dexie('myDatabase');
db.version(1).stores({
  record: '++id, firstName, lastName, email', // Primary key and indexed props
  item:'++id ,name ,descripion',
});

