import { Tab, TabList, Tabs } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const Navigation = ({ userObj }) => (
  <Tabs>
    <TabList>
      <Tab><Link to="/">Home</Link></Tab>
      <Tab><Link to="/profile">{ userObj.displayName }'s Profile</Link></Tab>
    </TabList>
  </Tabs>
)
export default Navigation