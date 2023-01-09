import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Table from 'react-bootstrap/Table';

export default function ProxyWithLogic() {

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [networkID, setNetworkID] = useState(null);
    const [contract, setContract] = useState(null);
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
        setTimeout(async () => {
            const ProxyArtifact = require(`../contracts/Proxy.json`);
            const _web3 = new Web3(Web3.givenProvider);
            const _accounts = await _web3.eth.requestAccounts();
            const networkID = await _web3.eth.net.getId();
            const { abi } = ProxyArtifact;
            let address, contract;
            try {
                address = ProxyArtifact.networks[networkID].address;
                contract = new _web3.eth.Contract(abi, address);
            } catch (err) {
                console.error(err);
            }

            await contract.methods._contractAddress().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    setContractAdd(e);
                })
                .catch(err => console.log(err));

            let logicContractAddress;

            await contract.methods.logicContractAddress().call({ from: _accounts[0] })
                .then(e => {
                    //console.log(e);
                    logicContractAddress = e;
                    setLogicConAdd(e);
                })
                .catch(err => console.log(err));

            if (logicContractAddress !== '0x0000000000000000000000000000000000000000') {
                for (let i = 1; i < 5; i++) {
                    const artifact = require(`../contracts/Logic${i}.json`);
                    if (artifact.networks[networkID].address === logicContractAddress) {
                        const { abi } = artifact;
                        contract = new _web3.eth.Contract(abi, address);
                        setLogicCon(`Logic${i}`);
                        break;
                    }
                }

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
            }

            setWeb3(_web3);
            setAccounts(_accounts);
            setNetworkID(networkID);
            setContract(contract);


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
                        <td>Proxy</td>
                        <td>{contractAdd && contractAdd}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{logicCon}</td>
                        <td> {logicConAdd && logicConAdd}</td>
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
                {logicCon === 'Logic2' && <input onChange={set_MyBalanceHandler} value={_myBalance} />}
                {logicCon === 'Logic2' && <button onClick={withdrawETHHandler}>Withdraw</button>}<br />
            </div>}
        </div>
    )
}
