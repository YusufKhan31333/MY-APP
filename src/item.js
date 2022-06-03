import item from './item';
import './index.css';
import { db } from "./db";
import React, {  useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';

function ClearDatabaseButton() {
  return (
    <button
      className="large-button"
      onClick={() => {
        db.transaction("rw", db.tables, async () => {
          await Promise.all(db.tables.map((table) => table.clear()));
        });
      }}
    >
      Clear Database
    </button>
  );
}




 
 function Item() {
  const [id, setId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [count, setCount] = useState("");

  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [show, setShow] = useState(false);

 
 
  
  
  const editItem =(id) => {
    let newEditItem = record.find((friend)=>{
      return friend.id===id
    });
    
    console.log(newEditItem);

    setToggleSubmit(false);
    setShow(true);

    setId(newEditItem.id);

    setFirstName(newEditItem.firstName);
    setLastName(newEditItem.lastName);
    setEmail(newEditItem.email);
    setStatus(newEditItem.status);
    setCount(newEditItem.count);

    
  }
  async function UpdateRecord() {
    db.record.update({id}, {firstName: firstName, lastName: lastName, email: email}).then(function (updated) {
      if (updated)
      setStatus (`Record number ${id} is Updated`);
      else
      setStatus ("Nothing updated ");
    });
    }
   
  
      const record = useLiveQuery(
        () => db.record.toArray()
      );

      db.record.where('firstName').startsWithIgnoreCase('y').toArray(function(record) {
        console.log("Found: " + record.length + " friends starting with y");
    });

    db.record.toCollection().count(function (count) {
      setCount(`Total records ${count}`);

      console.log(count + " friends in total");
  });
    

  async function addFriend() {
    try {

      // Add the new friend!
    
        const id = await db.record.add({
          firstName,
          lastName,
          email
        });
        setStatus(`Friend ${firstName} successfully added. Got id ${id}`);
        
     

      
    } catch (error) {
      setStatus(`Failed to add ${firstName}: ${error}`);
    }
  }

  return <>

 

    <p>
      {status}
    </p>

    <p>
      {count}
    </p>
    
    
    
    {show?
    
    <input
      type="text"
      value={id}
      onChange={ev => setId(ev.target.value)}
    />:null
    }

    First Name:
    <input
      type="text"
      value={firstName}
      onChange={ev => setFirstName(ev.target.value)}
    />
    Last Name:
    <input
      type="text"
      value={lastName}
      onChange={ev => setLastName(ev.target.value)}
    />
     Email:
    <input
      type="text"
      value={email}
      onChange={ev => setEmail(ev.target.value)}
    />
   {toggleSubmit ?
    <button onClick={addFriend}>
      Add
    </button>:
    
    <button onClick={() => UpdateRecord()}>Update</button>

    
   }

<ul>
  
  
  
  {record?.map(friend => <li key={friend.id}>
    {friend.id},{friend.firstName}, {friend.lastName}, {friend.email}, <button onClick={() => db.record.delete(friend.id)} title="Delete list">
     Delete </button>,
     <button onClick={() => editItem(friend.id)}>
  Edit
</button>
  </li>)}
</ul>;

   
  </>
}

 export default Item;
    
     
  
