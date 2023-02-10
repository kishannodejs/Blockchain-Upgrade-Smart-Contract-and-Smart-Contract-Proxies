import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Table from 'react-bootstrap/Table';
import Tx from './Tx';
import { Link } from 'react-router-dom';
import useMeta from '../MetamaskLogin/useMeta';

export default function ProxyWithLogic({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {

    const { state } = useMeta();

    const [ProxyAddLogicABI_Contract, setProxyAddLogicABI_Contract] = useState(null);
    const [contractAdd, setContractAdd] = useState(null);
    const [logicCon, setLogicCon] = useState("--");
    const [logicConAdd, setLogicConAdd] = useState("");

    const [myAdd, setMyAdd] = useState("");
    const [myUint, setMyUint] = useState("");
    const [myBalance, setMyBalance] = useState("");

    const [_myAdd, set_myAdd] = useState("");
    const [_myBalance, set_MyBalance] = useState("");

    const logicConHandler = (e) => {
        setLogicCon(e.target.value);
    }

    const logicConSubmit = () => {
        window.location.reload(false);

    }


    useEffect(() => {
        if (state.accounts) {
            setTimeout(async () => {
                await state.ProxyContract.methods._contractAddress().call({ from: state.accounts[0] })
                    .then(e => {
                        //console.log(e);
                        setContractAdd(e);
                    })
                    .catch(err => console.log(err));

                let logicContractAddress;

                await state.ProxyContract.methods.logicContractAddress().call({ from: state.accounts[0] })
                    .then(e => {
                        //console.log(e);
                        logicContractAddress = e;
                        setLogicConAdd(e);
                    })
                    .catch(err => console.log(err));

                if (logicContractAddress !== '0x0000000000000000000000000000000000000000') {
                    for (let i = 1; i < 5; i++) {
                        const LogicArtifact = require(`../contracts/Logic${i}.json`);
                        if (LogicArtifact.networks[state.networkID].address === logicContractAddress) {
                            const { abi } = LogicArtifact;
                            const contract = new state.web3.eth.Contract(abi, state.ProxyAddress);
                            setProxyAddLogicABI_Contract(contract);
                            setLogicCon(`Logic${i}`);
                            if (ProxyAddLogicABI_Contract) getDataHandler();
                            break;
                        }
                    }
                }
            }, 100)
        } else {
            setContractAdd("--");
            setLogicConAdd("--");
            setMyAdd("--");
            setMyUint("--");
            setMyBalance("--");
        }

    }, [state.accounts])

    useEffect(() => {
        if (ProxyAddLogicABI_Contract) getDataHandler();
    }, [ProxyAddLogicABI_Contract])

    const getDataHandler = async () => {
        await ProxyAddLogicABI_Contract.methods.myAddress().call({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setMyAdd(e);
            })
            .catch(err => console.log(err));
        await ProxyAddLogicABI_Contract.methods.myUint().call({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setMyUint(e);
            })
            .catch(err => console.log(err));
        await ProxyAddLogicABI_Contract.methods.balanceOf(state.accounts[0]).call({ from: state.accounts[0] })
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
        await ProxyAddLogicABI_Contract.methods.setAddress(_myAdd).send({ from: state.accounts[0] })
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
        await ProxyAddLogicABI_Contract.methods.inc().send({ from: state.accounts[0] })
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

    const decUintHandler = async () => {
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await ProxyAddLogicABI_Contract.methods.dec().send({ from: state.accounts[0] })
            .then(e => {
                //console.log(e);
                setReceipt(e);
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
        await ProxyAddLogicABI_Contract.methods.deposit()
            .send({
                value: Web3.utils.toWei(_myBalance, 'ether'),
                from: state.accounts[0]
            })
            .then(e => {
                //console.log(e);
                setReceipt(e);
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

    const withdrawETHHandler = async () => {
        if (!state.accounts) {
            alert("Please Connect Wallet.");
            return;
        }
        setBackdrop(true);
        await ProxyAddLogicABI_Contract.methods.withdraw(Web3.utils.toWei(_myBalance, 'ether'))
            .send({
                from: state.accounts[0]
            })
            .then(e => {
                //console.log(e);
                setReceipt(e);
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
                        <td>Proxy</td>
                        <td>{contractAdd && <Link onClick={() => window.open(`https://mumbai.polygonscan.com/address/${contractAdd}`)}>{contractAdd}</Link>}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{logicCon}</td>
                        <td>{logicConAdd && <Link onClick={() => window.open(`https://mumbai.polygonscan.com/address/${logicConAdd}`)}>{logicConAdd}</Link>}</td>
                    </tr>
                </tbody>
            </Table>
            {logicCon !== '--' && <h1>Data</h1>}
            {logicCon !== '--' && <Table striped bordered hover>
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
            </Table>}
            {logicCon !== '--' && <div>
                <label><h1>My Address</h1></label><br />
                <input onChange={setMyAddHandler} value={_myAdd} />
                <button onClick={setDataHandler}>Set Address</button> <br />
                <label><h1>My Uint</h1></label><br />
                <button onClick={incUintHandler}>Increment</button>
                {logicCon === 'Logic2' && <button onClick={decUintHandler}>Decrement</button>}<br />
                <label><h1>Balance</h1></label><br />
                <input onChange={set_MyBalanceHandler} value={_myBalance} />
                <button onClick={depositETHHandler}>Deposit</button>
                {/* {logicCon === 'Logic2' && <input onChange={set_MyBalanceHandler} value={_myBalance} />} */}
                {logicCon === 'Logic2' && <button onClick={withdrawETHHandler}>Withdraw</button>}<br />
            </div>}
        </div>
    )
}
