import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Table from 'react-bootstrap/Table';

export default function Logic2() {

    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    const [logicContractAdd, setLogicContractAdd] = useState(null);
    const [eternalStorage, setEternalStorage] = useState(null);

    const [myAdd, setMyAdd] = useState("");
    const [myUint, setMyUint] = useState("");

    const [_myAdd, set_myAdd] = useState("");
    const [_myUint, set_myUint] = useState("");
    const [_eternalStorage, set_EternalStorage] = useState("");

    useEffect(() => {
        setTimeout(async () => {
            const artifact = require(`../contracts/Logic2.json`);
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
            setLogicContractAdd(address);

            await contract.methods._EternalStorage().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setEternalStorage(e);
                })
                .catch(err => console.log(err));
            await contract.methods.getAddress().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setMyAdd(e);
                })
                .catch(err => console.log(err));
        }, 100)

    }, [])

    const getDataHandler = async () => {
        await contract.methods._EternalStorage().call({ from: accounts[0] })
            .then(e => {
                //console.log(e);
                setEternalStorage(e);
            })
            .catch(err => console.log(err));
        await contract.methods.myAddress().call({ from: accounts[0] })
            .then(e => {
                //console.log(e);
                setMyAdd(e);
            })
            .catch(err => console.log(err));
    }

    const setEternalAddHandler = (e) => {
        set_EternalStorage(e.target.value);
    }

    const setEternalStorageHandler = async () => {
        await contract.methods.setEternalAdd(_eternalStorage).send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        set_EternalStorage("");
        getDataHandler();
    }

    const setMyAddHandler = (e) => {
        set_myAdd(e.target.value);
    }

    const setDataHandler = async () => {
        await contract.methods.setAddress(_myAdd).send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        set_myAdd("");
        getDataHandler();
    }


    const setMyUintHandler = (e) => {
        set_myUint(e.target.value);
    }

    const set_MyUintHandler = async () => {
        await contract.methods.setAddress(_myAdd).send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        set_myUint("");
        getDataHandler();
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
                        <td>Logic1</td>
                        <td>{logicContractAdd && logicContractAdd}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Eternal Storage</td>
                        <td>{eternalStorage && eternalStorage}</td>
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
            <div>
                <label><h1>Eternal Storage</h1></label><br />
                <input onChange={setEternalAddHandler} value={_eternalStorage} />
                <button onClick={setEternalStorageHandler}>Set</button> <br />
                <label><h1>My Address</h1></label><br />
                <input onChange={setMyAddHandler} value={_myAdd} />
                <button onClick={setDataHandler}>Set</button> <br />
                <label><h1>My Uint</h1></label><br />
                <input onChange={setMyUintHandler} value={_myUint} />
                <button onClick={set_MyUintHandler}>Set</button> <br />
            </div>
        </div>
    )
}
