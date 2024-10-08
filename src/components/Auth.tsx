
//@ts-nocheck


"use client"
import React, { useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { HederaExtension } from '@magic-ext/hedera';
import { AccountId, TransferTransaction } from '@hashgraph/sdk';


import { MagicWallet,  } from '@/utils/magicWallet';
import { MagicProvider } from '@/utils/magicProvider';
import { magic } from '@/lib/create-magic-link-instance';



/*const magic = new Magic('pk_live_C8037E2E6520BBDF', {
  extensions: [
    new HederaExtension({
      network: 'testnet',
    }),
  ],
});*/

export default function Auth() {
  const [email, setEmail] = useState('');
  const [publicAddress, setPublicAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [sendingTransaction, setSendingTransaction] = useState(false);

  useEffect(() => {
    magic.user.isLoggedIn().then(async magicIsLoggedIn => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const publicAddress = (await magic.user.getMetadata()).publicAddress;
        setPublicAddress(publicAddress);
        setUserMetadata(await magic.user.getMetadata());
      }
    });
  }, [isLoggedIn]);


    console.log("user metadata", userMetadata)

  const login = async () => {
    await magic.auth.loginWithEmailOTP({ email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  const handleHederaSignTransaction = async () => {
    const { publicKeyDer } = await magic.hedera.getPublicKey();

    const magicSign = message => magic.hedera.sign(message);
    const magicWallet = new MagicWallet(publicAddress, new MagicProvider('testnet'), publicKeyDer, magicSign);
  
    let transaction = await new TransferTransaction()
      .setNodeAccountIds([new AccountId(3)])
      .addHbarTransfer(publicAddress, -1 * sendAmount)
      .addHbarTransfer(destinationAddress, sendAmount)
      .freezeWithSigner(magicWallet);

    transaction = await transaction.signWithSigner(magicWallet);
    const result = await transaction.executeWithSigner(magicWallet);
    const receipt = await result.getReceiptWithSigner(magicWallet);


      console.log("transaction reciepet", receipt)

      console.log("tx result", result)

    setSendingTransaction(true);

    console.log(receipt.status.toString());
    console.log("tx id",result.transactionId.toString());
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="border border-red-600  rounded-xl  p-4">
          <h1>Please sign up or login</h1>
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Enter your email"
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
          <button onClick={login}>Send</button>
        </div>
      ) : (
        <div>
          <div className="border-green-500 border">
            <h1>Current user: {userMetadata.email}</h1>
            <h1  className='text-red-500'>{MagicWallet.getAccountBlance}</h1>
         
            <button onClick={logout}>Logout</button>
          </div>
          <div className="container">
            <h1>Hedera account ID</h1>
            <div className="info">{publicAddress}</div>
          </div>
          <div className="container">
            <h1>Send Transaction</h1>
            {sendingTransaction ? (
              <div>
                <div>Send transaction success</div>
              </div>
            ) : (
              <div />
            )}
            <input
              type="text"
              name="destination"
              className="full-width"
              required="required"
              placeholder="Destination account id"
              onChange={event => {
                setDestinationAddress(event.target.value);
              }}
            />
            <input
              type="text"
              name="amount"
              className="full-width"
              required="required"
              placeholder="Amount in Har"
              onChange={event => {
                setSendAmount(event.target.value);
              }}
            />
            <button id="btn-send-txn" onClick={handleHederaSignTransaction}>
              Send Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

