import { dbService, storageService } from "fBase";
// import { getDatabase, push, ref, set } from "firebase/database";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState("")

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

    if (!nweet || !attachment) return

    let attachmentUrl = ""
    if (attachment) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}}`)
      const response = await uploadString(attachmentRef, attachment, "data_url")
      attachmentUrl = await getDownloadURL(response.ref)
    }

    const content = {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
    }

    await addDoc(collection(dbService, "nweets"), content)

    // const db = getDatabase()
    // const nweetsRef = ref(db, "nweets")
    // const newNwetRef = push(nweetsRef)
    // await set(newNwetRef, {
    //   nweet,
    //   createdAt: Date.now()
    // })
    setNweet("")
    setAttachment("")
  }

  const onChange = (event) => {
    const { target: { value } } = event
    setNweet(value)
  }

  const onFileChange = (event) => {
    const { target: { files } } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => {
    setAttachment("")
  }

  return <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind" max={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      { attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
    <div>
      {nweets.map(nweet => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  </div>
}

export default Home