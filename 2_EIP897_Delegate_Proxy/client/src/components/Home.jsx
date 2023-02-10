import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript.min.js';

const code = `//Connection to Metamask
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const accounts = await web3.eth.requestAccounts();
const networkID = await web3.eth.net.getId();
let { abi } = artifact;
let address, contract;
try {
    address = artifact.networks[networkID].address;
    contract = new web3.eth.Contract(abi, address);
} catch (error) {
    console.log(error);
}

// Call to Contract
const sample = async () => {
    await contract.methods.sampleCode()
        .call({
            from: state.accounts[0]
        })
        .then(e => {
            console.log(e);
        })
        .catch(err => console.log(err));
}

//Proxy
const { abi } = ProxyArtifact;
let ProxyAddress, ProxyContract;
try {
    ProxyAddress = ProxyArtifact.networks[networkID].address;
    ProxyContract = new web3.eth.Contract(abi, ProxyAddress);
} catch (error) {
    console.log(error);
}

const sample = async () => {
  await ProxyContract.methods.sampleCode()
      .call({
          from: state.accounts[0]
      })
      .then(e => {
          console.log(e);
      })
      .catch(err => console.log(err));
}

//Logic1
const { abi } = Logic1Artifact;
let Logic1Address, Logic1Contract;
try {
    Logic1Address = Logic1Artifact.networks[networkID].address;
    Logic1Contract = new web3.eth.Contract(abi, Logic1Address);
} catch (error) {
    console.log(error);
}

const sample = async () => {
  await Logic1Contract.methods.sampleCode()
      .call({
          from: state.accounts[0]
      })
      .then(e => {
          console.log(e);
      })
      .catch(err => console.log(err));
}

//Logic2
const { abi } = Logic2Artifact;
let Logic2Address, Logic2Contract;
try {
    Logic2Address = Logic2Artifact.networks[networkID].address;
    Logic2Contract = new web3.eth.Contract(abi, Logic2Address);
} catch (error) {
    console.log(error);
}

const sample = async () => {
  await Logic2Contract.methods.sampleCode()
      .call({
          from: state.accounts[0]
      })
      .then(e => {
          console.log(e);
      })
      .catch(err => console.log(err));
}

//Proxy Address with Logic ABI
const { abi } = LogicArtifact;
const ProxyWithLogicContract = new state.web3.eth.Contract(abi, ProxyAddress);

const sample = async () => {
  await ProxyWithLogicContract.methods.sampleCode()
      .call({
          from: state.accounts[0]
      })
      .then(e => {
          console.log(e);
      })
      .catch(err => console.log(err));
}
`


export default function Home({ language = 'javascript' }) {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <pre style={{ paddingTop: '70px' }}>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
    )
}
