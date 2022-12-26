import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Table from 'react-bootstrap/Table';

export default function Logic2() {

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [networkID, setNetworkID] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractAdd, setContractAdd] = useState(null);

    const [myAdd, setMyAdd] = useState("");
    const [myUint, setMyUint] = useState("");
    const [myBalance, setMyBalance] = useState("");

    const [_myAdd, set_myAdd] = useState("");
    const [_myBalance, set_MyBalance] = useState("");

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
            setWeb3(_web3);
            setAccounts(_accounts);
            setContract(contract);


            await contract.methods._contractAddress().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setContractAdd(e);
                })
                .catch(err => console.log(err));

            await contract.methods.myAddress().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setMyAdd(e);
                })
                .catch(err => console.log(err));
            await contract.methods.myUint().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setMyUint(e);
                })
                .catch(err => console.log(err));
            await contract.methods.balanceOf(_accounts[0]).call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setMyBalance(Web3.utils.fromWei(e, 'ether'));
                })
                .catch(err => console.log(err));
        }, 100)

    }, [])

    const getDataHandler = async () => {
        await contract.methods.myAddress().call({ from: accounts[0] })
            .then(e => {
                //console.log(e);
                setMyAdd(e);
            })
            .catch(err => console.log(err));
        await contract.methods.myUint().call({ from: accounts[0] })
            .then(e => {
                //console.log(e);
                setMyUint(e);
            })
            .catch(err => console.log(err));
        await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] })
            .then(e => {
                //console.log(e);
                setMyBalance(Web3.utils.fromWei(e, 'ether'));
            })
            .catch(err => console.log(err));
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

    const incUintHandler = async () => {
        await contract.methods.inc().send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        getDataHandler();
    }

    const decUintHandler = async () => {
        await contract.methods.dec().send({ from: accounts[0] })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        getDataHandler();
    }

    const set_MyBalanceHandler = (e) => {
        set_MyBalance(e.target.value);
    }

    const depositETHHandler = async () => {
        await contract.methods.deposit()
            .send({
                value: Web3.utils.toWei(_myBalance, 'ether'),
                from: accounts[0]
            })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        set_MyBalance("");
        getDataHandler();
    }

    const withdrawETHHandler = async () => {
        await contract.methods.withdraw(Web3.utils.toWei(_myBalance, 'ether'))
            .send({
                from: accounts[0]
            })
            .then(e => {
                //console.log(e);
            })
            .catch(err => console.log(err));
        set_MyBalance("");
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
                        <td>Logic2</td>
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
                <tbody>
                    <tr>
                        <th>3</th>
                        <th>My Balance</th>
                        <td>{myBalance}ETH</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <label><h1>My Address</h1></label><br/>
                <input onChange={setMyAddHandler} value={_myAdd} />
                <button onClick={setDataHandler}>Set Address</button> <br />
                <label><h1>My Uint</h1></label><br />
                <button onClick={incUintHandler}>Increment</button>
                <button onClick={decUintHandler}>Decrement</button><br />
                <label><h1>Balance</h1></label><br />
                <input onChange={set_MyBalanceHandler} value={_myBalance} />
                <button onClick={depositETHHandler}>Deposit</button>
                <input onChange={set_MyBalanceHandler} value={_myBalance} />
                <button onClick={withdrawETHHandler}>Withdraw</button> <br />
            </div>
        </div>
    )
}
