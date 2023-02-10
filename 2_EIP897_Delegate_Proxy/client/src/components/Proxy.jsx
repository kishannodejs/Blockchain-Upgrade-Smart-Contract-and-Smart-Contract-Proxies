import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import useEth from "../contexts/EthContext/useEth";
import Web3 from 'web3';
import Tx from './Tx';
import { Link } from 'react-router-dom';
import useMeta from '../MetamaskLogin/useMeta';

export default function Proxy({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {

    const { state } = useMeta();
    const [contractAdd, setContractAdd] = useState(null);
    const [logicAdd, setLogicAdd] = useState(null);
    const [newLogicAdd, setNewLogicAdd] = useState("");

    useEffect(() => {
        if (state.accounts) {
            setTimeout(async () => {
                await state.ProxyContract.methods._contractAddress().call({ from: state.accounts[0] })
                    .then(e => {
                        // console.log(e);
                        setContractAdd(e);
                    })
                    .catch(err => console.log(err));
                await state.ProxyContract.methods.logicContractAddress().call({ from: state.accounts[0] })
                    .then(e => {
                        // console.log(e);
                        setLogicAdd(e);
                    })
                    .catch(err => console.log(err));
            }, 100)
        } else {
            setContractAdd("--");
            setLogicAdd("--");

        }
    }, [state.accounts])

    const newLogicAddHandler = (e) => {
        //console.log(e.target.value);
        setNewLogicAdd(e.target.value);
    }
    const newLogicAddressSubmit = async () => {
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await state.ProxyContract.methods.setLogicAddress(newLogicAdd).send({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setReceipt(e);
                setTx(true);
            })
            .catch(err => {
                console.log(err);
                alert("Transaction Failed or Rejected by User.");
                console.log("in")
                setBackdrop(false);
            });
        setNewLogicAdd("");
        window.location.reload(false);
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
                        <td>Proxy</td>
                            <td>{contractAdd && <Link onClick={() => window.open(`https://mumbai.polygonscan.com/address/${contractAdd}`)}>{contractAdd}</Link>}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Current Logic</td>
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
