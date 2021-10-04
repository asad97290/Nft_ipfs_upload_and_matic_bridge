import React from "react";
import ServerUpload from "./component/ServerUpload"
// import IPFSUpload from "./component/IPFSUpload"
import MigrateToMatic from "./component/MigrateToMatic"

export default function App() {

  return (
  <div>
 <ServerUpload/>
 {/* <IPFSUpload/> */}
 <MigrateToMatic/>
  </div>
    )
}

