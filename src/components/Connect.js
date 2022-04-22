import React from "react";
import { useState } from "react";
import "./Connect.scss";

function Connect(props) {
  const [isConnecting, setIsConnecting] = useState(false);

  const detectProvider = () => {
    let provider;
    console.log(provider, "PROVIDER")
    if (window.ethereum) {
      provider = window.ethereum;
      console.log(provider, "PROVIDER")
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      console.log(provider)
    } else {
      window.alert("No Ethereum browser detected! Check out Metamask");
    }
    return provider;
  };

  const onConnectHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallets installed?"
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      console.log(provider, "IIII")
      setIsConnecting(false);
    }
    props.onConnect(provider);
  };

  return (
    <div className="connect">
      <button onClick={onConnectHandler} className="button" type="button">
        {!isConnecting && "Connect Wallet"}
        {isConnecting && "Loading..."}
      </button>
    </div>
  );
}

export default Connect;
