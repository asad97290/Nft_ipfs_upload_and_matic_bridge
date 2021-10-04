import React, { useState,useEffect } from "react";
import Web3 from "web3";

import { abi, contractAddress } from "../contracts/MyNft";
const ipfsClient = require("ipfs-api");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
export default function IPFSUpload() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  let [imgBuffer, setImageBuffer] = useState("");
 
  useEffect(() => {
    async function fetchData() {

      try {
        if (Web3.givenProvider) {
          const web3 = new Web3(Web3.givenProvider);
          setWeb3(web3);
          // await Web3.givenProvider.enable();
          await window.ethereum.request({ method: "eth_requestAccounts" });

          let contract = new web3.eth.Contract(abi, contractAddress);

          setContract(contract);
        } else {
          alert("please install metamask");
        }
      } catch (e) {
        alert(`Error: ${e}`);
      }
    }
    fetchData();
  }, []);
  const showFile = async (e) => {
    e.preventDefault();
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = async () => {
      setImageBuffer(Buffer(reader.result));
    };
  };

  const uploadImage = async () => {
    await ipfs.files.add(imgBuffer, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`)
      
      mintToken(result[0].hash);
    });
  };

  const mintToken = (hash) => {
    //to publish token metadata to IPFS

    const data = JSON.stringify(
      {
      name: document.getElementById("name").value,
      image: `https://gateway.pinata.cloud/ipfs/${hash}`,
      description:
        "Friendly OpenSea Creature that enjoys long swims in the ocean.",
      attributes: [
        {
          trait_type: "Age",
          value: document.getElementById("age").value,
        },
        {
          trait_type: "Breed",
          value: document.getElementById("breed").value,
        },
        {
          trait_type: "Location",
          value: document.getElementById("location").value,
        },
      ]
    }
    );

    ipfs.files.add(Buffer(data)).then((cid) => {
      console.log(cid)
      let petURI = `https://gateway.pinata.cloud/ipfs/${cid[0].hash}`;
      contract.method.mint(window.ethereum.selectedAddress).send({from:window.ethereum.selectedAddress});
    });
  };

  return (
    <div>
      {/* <NavBar /> */}

      {false ? (
        <img id="overlay" src="images/progress.gif" alt="progress.gif" />
      ) : (
        
        <div style={{ marginTop: 60 }}>
                  <h1>Add a Pet</h1>
          <div>
            Name: <input id="name" />
          </div>
          <div>
            Age: <input id="age" />
          </div>
          <div>
            Breed: <input id="breed" />
          </div>
          <div>
            Price: <input id="price" />
          </div>
          <div>
            Location: <input id="location" />
          </div>
          <input onChange={(e) => showFile(e)} type="file" id="file1" />
          <button onClick={uploadImage} className="btn btn-success">
            submit
          </button>
        </div>
      )}
    </div>
  );
}

