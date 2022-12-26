import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import useEth from "../contexts/EthContext/useEth";
import Web3 from 'web3';
export default function Proxy() {

    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractAdd, setContractAdd] = useState(null);
    const [logicAdd, setLogicAdd] = useState(null);
    const [newLogicAdd, setNewLogicAdd] = useState("");

    useEffect(() => {
        setTimeout(async () => {
            const artifact = require(`../contracts/Proxy.json`);
            const _web3 = new Web3(Web3.givenProvider);
            const _accounts = await _web3.eth.requestAccounts();
            const networkID = await _web3.eth.net.getId();
            const { abi } = artifact;
            let address, contract;
            try {
                address = artifact.networks[networkID].address;
                contract = new _web3.eth.Contract(abi, address);
            } catch (err) {
                console.error(err);
            }
            setAccounts(_accounts);
            setContract(contract);


            await contract.methods._contractAddress().call({ from: _accounts[0] })
                .then(e => {
                    // console.log(e);
                    setContractAdd(e);
                })
                .catch(err => console.log(err));
            await contract.methods.logicContractAddress().call({ from: _accounts[0] })
                .then(e => {
                    // console.log(e);
                    setLogicAdd(e);
                })
                .catch(err => console.log(err));
        }, 100)

    }, [])

    const newLogicAddHandler = (e) => {
        //console.log(e.target.value);
        setNewLogicAdd(e.target.value);
    }
    const newLogicAddressSubmit = async () => {
        await contract.methods.setLogicAddress(newLogicAdd).send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        setNewLogicAdd("");
        window.location.reload(false);
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Contract Name</th>
                        <th>Contract Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Proxy</td>
                        <td>{contractAdd && contractAdd}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Logic</td>
                        <td> {logicAdd && logicAdd}</td>
                    </tr>
                </tbody>
            </Table>
            <label><h1>SetLogicAddress</h1></label><br />
            <input onChange={newLogicAddHandler} value={newLogicAdd} />
            <button onClick={newLogicAddressSubmit}>Submit</button>
        </div>
    )
}
