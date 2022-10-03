import { dbService, storageService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
  const NweetTextRef = doc(dbService, "nweets", nweetObj.id)
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?")
    if (ok) {
      await deleteDoc(NweetTextRef)
      if (nweetObj.attachmentUrl) {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl))
      }
    }
  }
  const toggleEditing = () => {
    if (editing) setNewNweet(nweetObj.text)
    setEditing((prev) => !prev)
  }
  const onChange = (event) => {
    const {
      target: {value},
    } = event
    setNewNweet(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, { text: newNweet })
    setEditing(false)
  }

  return (
    <div>
      {
        editing && isOwner?
          <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
              />
            <input type="submit" value="Update Nweet"></input>
          </form>
          </>
          :
          <>
            <p>{nweetObj.text}</p>
            { nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />}
          </>
      }
      {isOwner && (
        <>
          <button onClick={toggleEditing}>
            {editing? "Cancel" : "Update"}
          </button>
          <button onClick={onDeleteClick}>Delete</button>
        </>
      )}
    </div>
  )
}

export default Nweet