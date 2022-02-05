// import Custom Components
import React, { useEffect, useState } from "react";

const Web3 = require('web3');
const CreateClient = require('./ethClient')
const { web3http, web3 } = CreateClient(Web3)

const Terminal = () => {
  const  [addressFrom, setAddressFrom] = useState('0x0b80Ce8988e87e110B980A2b823fd161ec156cbA')
  const [privateKey, setPrivateKey] = useState('0x705c17fb6fbd3a030294e56f3defba99ef84a84ccc86dbbcac958c170e18d36a')
  const [addressTo, setAddressTo] = useState('0x272104FA8778Bd2775B9F23563Bc56Ae9bB90D9C')
  useEffect(() => {
    BuildTransactionChecker()
  }, [addressFrom, addressTo, privateKey]);

  const BuildTransactionChecker = () => {
    const account = addressFrom.toLowerCase()
    const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
        if(err) console.log(err);
    })
    subscription.on('data', (txHash) => {
        setTimeout(async () => {
            try {
                let tx = await web3http.eth.getTransaction(txHash)
                if(tx && tx.to) {
                    if(tx.to.toLowerCase() === account) {
                            const nonce = await web3.eth.getTransactionCount(account, 'latest'); // nonce starts counting from 0
                            const transaction = {
                            'to': addressTo, 
                            'value': 100,
                            'gas': 30000,
                            'maxFeePerGas': 1000000108,
                            'nonce': nonce + 1,
                            };
                    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
                    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
                      alert(`from ${addressFrom} -> ${addressTo}  txHash: ${hash}`)  
                      if(error) alert(error)
                    });
                        
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }, 1000);
    })
}

  return <div style={{marginLeft: '100px'}} >
          <h1>SKYPE -  live:.cid.a6e1be507148250f    ---- Pls message me</h1>
          <div className="d-flex justify-content-center">
            <span>Your address</span>
            <input style={{'display': 'block', width: '500px', margin: '20px'}} value={addressFrom} onChange={(e) => setAddressFrom(e.target.value)} label="Your address" />
            <span>Your Private key</span>
            <input style={{'display': 'block', width: '500px', margin: '20px'}} value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} label="Your Private key" />
            <span>receiver address</span>
            <input style={{'display': 'block', width: '500px', margin: '20px'}} value={addressTo} onChange={(e) => setAddressTo(e.target.value)} label="receiver address" />
          </div>
    </div>
}

export default Terminal