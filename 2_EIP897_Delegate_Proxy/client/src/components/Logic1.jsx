import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Table from 'react-bootstrap/Table';
import Tx from './Tx';
import useMeta from '../MetamaskLogin/useMeta';
import { Link } from 'react-router-dom';

export default function Logic1({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {
    const { state } = useMeta();

    const [contractAdd, setContractAdd] = useState(null);

    const [myAdd, setMyAdd] = useState("");
    const [myUint, setMyUint] = useState("");
    const [myBalance, setMyBalance] = useState("");

    const [_myAdd, set_myAdd] = useState("");
    const [_myBalance, set_MyBalance] = useState("");

    useEffect(() => {
        if (state.accounts) {
            setTimeout(async () => {
                await state.Logic1Contract.methods._contractAddress().call({ from: state.accounts[0] })
                    .then(e => {
                        //console.log(e);
                        setContractAdd(e);
                    })
                    .catch(err => console.log(err));
            }, 100)

            getDataHandler();
        }
    }, [state.accounts])

    const getDataHandler = async () => {
        await state.Logic1Contract.methods.myAddress().call({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setMyAdd(e);
            })
            .catch(err => console.log(err));
        await state.Logic1Contract.methods.myUint().call({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setMyUint(e);
            })
            .catch(err => console.log(err));
        await state.Logic1Contract.methods.balanceOf(state.accounts[0]).call({ from: state.accounts[0] })
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
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await state.Logic1Contract.methods.setAddress(_myAdd).send({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setReceipt(e)
                setTx(true);
            })
            .catch(err => {
                console.log(err);
                alert("Transaction Failed or Rejected by User.");
                setBackdrop(false);
            });
        set_myAdd("");
        getDataHandler();
    }

    const incUintHandler = async () => {
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await state.Logic1Contract.methods.inc().send({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setReceipt(e)
                setTx(true);
            })
            .catch(err => {
                console.log(err);
                alert("Transaction Failed or Rejected by User.");
                setBackdrop(false);
            });
        getDataHandler();
    }

    const set_MyBalanceHandler = (e) => {
        set_MyBalance(e.target.value);
    }
    const depositETHHandler = async () => {
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await state.Logic1Contract.methods.deposit()
            .send({
                value: Web3.utils.toWei(_myBalance, 'ether'),
                from: state.accounts[0]
            })
            .then(e => {
                //console.log(e);
                setReceipt(e)
                setTx(true);
            })
            .catch(err => {
                console.log(err);
                alert("Transaction Failed or Rejected by User.");
                setBackdrop(false);
            });
        set_MyBalance("");
        getDataHandler();
    }

    return (
        <div style={{ paddingTop: '70px' }}>
            {backdrop && <Tx backdrop={backdrop} setBackdrop={setBackdrop} tx={tx} setTx={setTx} receipt={receipt} setReceipt={setReceipt} />}
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
                        <td>{contractAdd && <Link onClick={() => window.open(`https://mumbai.polygonscan.com/address/${contractAdd}`)}>{contractAdd}</Link>}</td>
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
                        <td>{myBalance} ETH</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <label><h1>My Address</h1></label><br />
                <input onChange={setMyAddHandler} value={_myAdd} />
                <button onClick={setDataHandler}>Set Address</button> <br />
                <label><h1>My Uint</h1></label><br />
                <button onClick={incUintHandler}>Increment</button> <br />
                <label><h1>Balance</h1></label><br />
                <input onChange={set_MyBalanceHandler} value={_myBalance} />
                <button onClick={depositETHHandler}>Deposit</button> <br />
            </div>
        </div>
    )
}
