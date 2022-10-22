import { Button, Input } from "@chakra-ui/react";
import { authService, dbService } from "fBase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate("/")
  }
  const getMyNweets = async() => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    // snapshot.forEach(doc => console.log(doc.id, "=>", doc.data()))
  }
  useEffect(() => {
    getMyNweets()
  })
  const onChange = (event) => {
    const { target: { value } } = event
    setNewDisplayName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    // todo: photo 추가하기
    if (!newDisplayName || userObj.displayName === newDisplayName) return
    await updateProfile(authService.currentUser, { displayName: newDisplayName })
    refreshUser()
    alert("Profile updated.")
  }

  return (
  <>
    <form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        value={newDisplayName}
        type="text"
        placeholder="Display Name" />
      <Button size="sm" type="submit">Update Profile</Button>
    </form>
    <Button size="sm" onClick={onLogOutClick}>Log Out</Button>
    <Button size="sm">Clear all my nweets</Button>
    <Button size="sm">Resign</Button>
  </>
  )
}

export default Profile