import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Web3 from 'web3';
export default function EternalStorage() {

    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractAdd, setContractAdd] = useState(null);
    
    const [myAdd, setMyAdd] = useState(null);
    const [myUint, setMyUint] = useState("");

    useEffect(() => {
        setTimeout(async () => {
            const artifact = require(`../contracts/EternalStorage.json`);
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
            setContractAdd(address);

            await contract.methods.getMyAddress().call({ from: _accounts[0] })
                .then(e => {
                    // console.log(e);
                    setMyAdd(e);
                })
                .catch(err => console.log(err));
            
                await contract.methods.getMyUint().call({ from: _accounts[0] })
                .then(e => {
                    // console.log(e);
                    setMyUint(e);
                })
                .catch(err => console.log(err));
        }, 100)

    }, [])

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
                        <td>Eternal Storage</td>
                        <td>{contractAdd && contractAdd}</td>
                    </tr>
                </tbody>
            </Table>
            <h1>Data</h1>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>My Address</th>
                        <td>{myAdd}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th>2</th>
                        <th>My Uint</th>
                        <td>{myUint}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
