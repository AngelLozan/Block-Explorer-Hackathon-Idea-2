/* global chrome */
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import '../styles/App.css';
import { ThreeDots } from 'react-loader-spinner';
import logo from './fella.png';


function SourceInput() {
    const ref = useRef(null);
    //const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState();
    const [frameSource, setFrameSource] = useState();

    const Results = () => (
        <div id="results" className="search-results">
      <iframe id="showFrame" ref={ref} src={frameSource} height="300" width="500" title="blockscan" target="_parent" onLoad={hideLoader} allowfullscreen></iframe>
    </div>
    )

    //To Do: Check both address and tx hash for dups like btc and ada and other btc-like assets. lsajflsdj.test || lsjflsd.test = btc

    const emojis = ['✌️ Enter query', '🤔 I\'m listening', '🦾 I find things', '🚀 To the moon\!', '🤙 Query vibez', '🖖 Search ser', '👋 Hi there', '👾 Can I help?', '🧠 Query me', '🌈 Enter search', '✨ Shiny searches', '💫 Find a tx here'];
    const getRandomEmoji = () => {
        return emojis[~~(Math.random() * emojis.length)]
    };

    const lookUpText = async () => {
        var x = await document.getElementById("snackbar");
        x.innerText = "🔍 One moment, let me look that up...";
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
    }

    const hideLoader = () => {
        let loading = document.getElementById("loadingBars");
        loading.style.display = "none";
        console.log("Loader Hidden.")
    }

    const search = async () => {
        let source = await document.getElementById('sourceInput').value
        let loading = document.getElementById("loadingBars");
        //setLoading(true);
        loading.style.display = "block";

        if (source === null || source === undefined || !source) {
            //setLoading(false);
            loading.style.display = "none";
            var x = await document.getElementById("snackbar");
            x.innerText = `${getRandomEmoji()}`;
            x.className = "show";
            setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
        } else if (/^0x[a-fA-F0-9]{40}$/.test(source)) {
            let address = 'https://blockscan.com/address/' + source;
            await setFrameSource(address);
            console.log('ETH addy ', address + source);
            await lookUpText();
            setShowResults(true);
        } else if (/^0x([A-Fa-f0-9]{64})$/.test(source)) {
            let address = 'https://blockscan.com/tx/' + source;
            await setFrameSource(address);
            console.log('ETH TX ', address, source);
            await lookUpText();
            setShowResults(true);
        } else if (/^r[1-9A-HJ-NP-Za-km-z]{25,33}$/.test(source)) {
            // XRP address
            let address = 'https://livenet.xrpl.org/accounts/' + source;
            await setFrameSource(address);
            await lookUpText();
            setShowResults(true);
        } else if (/^[A-F0-9]{64}$/.test(source)) {
            // XRP transaction
            let address = 'https://livenet.xrpl.org/transactions/' + source;
            await setFrameSource(address);
            await lookUpText();
            setShowResults(true);
        } else if (/^1[a-km-zA-HJ-NP-Z1-9]{25,34}(?!\/)$/.test(source) || /3[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(source) || /^bc(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})$/.test(source)) {
            //btc address
            let address = 'https://bitcoinexplorer.org/address/' + source;
            await setFrameSource(address);
            await lookUpText();
            setShowResults(true);
        } else if (/^[0-9a-f]{64}$/.test(source)) {
            //btc tx
            let address = 'https://bitcoinexplorer.org/tx/' + source;
            await setFrameSource(address);
            await lookUpText();
            setShowResults(true);
        } else {
            //await setLoading(false);
            loading.style.display = "none";
            var x = await document.getElementById("snackbar");
            x.innerText = "😥 No results found for that query. Click me to reset."
            x.className = "show";
            setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
        }
    }

    useEffect(() => {



        const handleClick = event => {
            const a = event.target.closest('a[href]');
            if (a) {
                event.preventDefault();
                chrome.tabs.create({ url: a.href, active: false });
            }
        }

        const element = ref.current;

        if (element) {
            element.addEventListener('click', handleClick);
        } else {
            console.log("No element");
        }

        return () => {
            element.removeEventListener('click', handleClick);
        };
    }, []);

    return (

        <div className='sourceInputContainer'>
        <h2>Support Explorer</h2>
        <a href="" tabIndex="-1" title="Exodude loves you">
        <img class="animated bounce" style={{ width: "auto" , height:"2em" }}src={logo} />
        </a>
        <input autoFocus id='sourceInput' className='sourceInput' placeholder='Address or Transaction ID' tabIndex="1" selected></input>
        <button class = "searchBtn" onClick={search} tabIndex="2">Search</button> 
       
        <div id = "loadingBars" className="bars">
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#1a1d40"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         />
        </div>

{showResults && <div> <Results /> </div> }

        <div id="snackbar"></div>    

        </div>

    )
}



export default SourceInput