import React, { useEffect, useState } from "react";
import { MaticPOSClient } from "@maticnetwork/maticjs";
import { contractAddress } from "../contracts/MyNft";
const HDWalletProvider = require("@truffle/hdwallet-provider");
export default function MigrateToMatic() {
  const [from, setFrom] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [maticPOSClient, setMaticPOSClient] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    
    let from = "0xb3aef82e52372CC56cB6209308af77977d0dd55e";
    const maticPOSClient = new MaticPOSClient({
      network: "testnet",
      version: "mumbai",
      parentProvider: new HDWalletProvider(
        "f5154c76b42f0e90ba5e1ec7d6eb3b47438ba6752df3b5c733df5f8c10b03ca8",
        "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      ),
      maticProvider: new HDWalletProvider(
        "f5154c76b42f0e90ba5e1ec7d6eb3b47438ba6752df3b5c733df5f8c10b03ca8",
        "https://rpc-mumbai.maticvigil.com/v1/03cc0242a7c59380545daa57821a13c0e717a3c8"
      ),
    });
    console.log(`maticPOSClient`, maticPOSClient);
    setMaticPOSClient(maticPOSClient);
    setFrom(from);
  }

  async function approve(tokenId) {
    console.log(`tokenId`, tokenId);
    try {
      const tx = await maticPOSClient.approveERC721ForDeposit(
        contractAddress,
        tokenId,
        { from:"0xb3aef82e52372CC56cB6209308af77977d0dd55e" }
      );
      console.log(tx.transactionHash); // eslint-disable-line
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }

  async function deposite(tokenId) {
    try {
      const tx = await maticPOSClient.depositERC721ForUser(
        contractAddress,
        from,
        tokenId,
        {
          from,
          gasPrice: "210000",
        }
      );
      console.log(`tx`, tx.transactionHash);
    } catch (e) {
      console.log(`e`, e);
    }
  }

  return (
    <div>
      <h3>Approve Token</h3>
      <label>Token Id</label>
      <input type="text" onChange={(e) => setTokenId(e.target.value)} />
      <button onClick={() => approve(tokenId)}>approve</button>
      <button onClick={() => deposite(tokenId)}>deposite</button>
    </div>
  );
}
