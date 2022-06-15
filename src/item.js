import './index.css';
import { db } from "./db";
import React, {  useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";







 
 function Item() {
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [descripion, setDescripion] = useState("");
  const [status, setStatus] = useState("");
  const [count, setCount] = useState("");

  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [show, setShow] = useState(false);

 
 
  
  
  const editItem =(id) => {
    let newEditItem = item.find((friend)=>{
      return friend.id===id
    });
    
    console.log(newEditItem);

    setToggleSubmit(false);
    setShow(true);

    setId(newEditItem.id);

    setName(newEditItem.name);
    setDescripion(newEditItem.descripion);
    setStatus(newEditItem.status);
    setCount(newEditItem.count);

    
  }
  async function UpdateItem() {
    db.item.update({id}, {name: name, descripion: descripion}).then(function (updated) {
      if (updated)
      setStatus (`Record number ${id} is Updated`);
      else
      setStatus ("Nothing updated ");
    });
    }
   
  
      const item = useLiveQuery(
        () => db.item.toArray()
      );

      db.item.where('name').startsWithIgnoreCase('y').toArray(function(item) {
        console.log("Found: " + item.length + " friends starting with y");
    });

    db.item.toCollection().count(function (count) {
      setCount(`Total records ${count}`);

      console.log(count + " friends in total");
  });
    

  async function addFriend() {
    try {

      // Add the new friend!
    
        const id = await db.item.add({
          name,
          descripion
        });
        setStatus(`Friend ${name} successfully added. Got id ${id}`);
        
     

      
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return <>

 <h2>Item Page</h2>

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

    Name:
    <input
      type="text"
      value={name}
      onChange={ev => setName(ev.target.value)}
    />
    Description:
    <input
      type="text"
      value={descripion}
      onChange={ev => setDescripion(ev.target.value)}
    />
    
   {toggleSubmit ?
    <button onClick={addFriend}>
      Add
    </button>:
    
    <button onClick={() => UpdateItem()}>Update</button>

    
   }

<ul>
  
  
  
  {item?.map(friend => <li key={friend.id}>
    {friend.id},{friend.name}, {friend.descripion}, <button onClick={() => db.record.delete(friend.id)} title="Delete list">
     Delete </button>,
     <button onClick={() => editItem(friend.id)}>
  Edit
</button>
  </li>)}
</ul>;

   
  </>
}

 export default Item;
    
     
  
