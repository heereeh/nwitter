import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, IconButton, Text, Textarea } from "@chakra-ui/react";
import { dbService, storageService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useMemo, useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
  const NweetTextRef = doc(dbService, "nweets", nweetObj.id)
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const created = useMemo(() => {
    const date = nweetObj.createdAt?.seconds
    if (!date) return ""
    return new Date(date * 1000).toUTCString()
  })

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
    <Box borderWidth="1px" borderRadius="lg" display="flex" p="4" m="2">
      <Box p="2">
        <Avatar size="sm" p="1"/>
      </Box>
      <Box flex="1" p="2">
      {
        editing && isOwner?
          <>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
              />
            <Button size="sm" colorScheme="blue" type="submit">Update Nweet</Button>
          </form>
          </>
          :
          <>
            <Text>{nweetObj.text}</Text>
            { nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />}
            <Text fontSize="xs">{created}</Text>
          </>
      }
      </Box>
      {isOwner && (
        <>
          <IconButton size="xs" borderRadius="10px" onClick={toggleEditing} icon={editing?<CloseIcon/>:<EditIcon/>}/>
          <IconButton size="xs" borderRadius="10px" onClick={onDeleteClick} icon={<DeleteIcon/>}/>
        </>
      )}
    </Box>
  )
}

export default Nweet