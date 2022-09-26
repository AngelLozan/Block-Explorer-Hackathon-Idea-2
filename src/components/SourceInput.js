/* global chrome */
import React from 'react'
import '../styles/App.css'

function SourceInput() {

    function search() {
        let source = document.getElementById('sourceInput').value
        console.log(source.length)

        if (/^0x[a-fA-F0-9]{40}$/.test(source)){
            // Ethereum address
            chrome.tabs.create({active: true, url: 'https://blockscan.com/address/' + source})
        }
        else if (/^0x([A-Fa-f0-9]{64})$/.test(source)){
            // Ethereum transaction
            chrome.tabs.create({active: true, url: 'https://blockscan.com/tx/' + source})
        }
        else if (/^r[1-9A-HJ-NP-Za-km-z]{25,33}$/.test(source)){
            // XRP address
            chrome.tabs.create({active: true, url: 'https://xrpscan.com/account/' + source})
        }
        else if (/^[A-F0-9]{64}$/.test(source)){
            // XRP transaction
            chrome.tabs.create({active: true, url: 'https://xrpscan.com/tx/' + source})
        }
        else {
            console.log('Not a valid address or transaction ID')
        }
    }

  return (
    <div className='sourceInputContainer'>
        <h2>Support Explorer</h2>
        <input id='sourceInput' className='sourceInput' placeholder='Address/Transaction ID'></input>
        <button onClick={search}>Search</button>
    </div>
  )
}

export default SourceInput