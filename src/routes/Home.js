import { dbService } from "fBase";
// import { getDatabase, push, ref, set } from "firebase/database";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet"
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
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

  return <div>
    <NweetFactory userObj={userObj} />
    <div>
      {nweets.map(nweet => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
      ))}
    </div>
  </div>
}

export default Home