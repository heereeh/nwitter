import { dbService } from "fBase";
// import { getDatabase, push, ref, set } from "firebase/database";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet"

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])

  const getNweets = async() => {
    const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      setNweets(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }
  
  useEffect(() => {
    getNweets()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!nweet) return
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    })
    // const db = getDatabase()
    // const nweetsRef = ref(db, "nweets")
    // const newNwetRef = push(nweetsRef)
    // await set(newNwetRef, {
    //   nweet,
    //   createdAt: Date.now()
    // })
    setNweet("")
  }

  const onChange = (event) => {
    const { target: { value } } = event
    setNweet(value)
  }

  return <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind" max={120} />
      <input type="submit" value="Nweet" />
    </form>
    <div>
      {nweets.map(nweet => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  </div>
}

export default Home