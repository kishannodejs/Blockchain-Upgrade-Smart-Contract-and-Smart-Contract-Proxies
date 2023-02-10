import Web3 from 'web3';
import MetaContext from './MetaContext';

import React, { useCallback, useReducer, useEffect } from 'react'
import { reducer, initialState } from "./state";

function MetaProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const init = useCallback(
        async (Logic1Artifact, Logic2Artifact, ProxyArtifact) => {
            if (Logic1Artifact && Logic2Artifact && ProxyArtifact) {
                const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
                let accounts;
                setTimeout(async () => {
                    if (localStorage.getItem('Address')) {
                        accounts = await web3.eth.requestAccounts();
                    }
                    else {
                        accounts = null;
                    }
                }, 100)
                const networkID = await web3.eth.net.getId();
                let { abi } = Logic1Artifact;
                let Logic1Address, Logic1Contract;
                try {
                    Logic1Address = Logic1Artifact.networks[networkID].address;
                    Logic1Contract = new web3.eth.Contract(abi, Logic1Address);
                } catch (error) {
                    console.log(error);
                }

                ({ abi } = Logic2Artifact);
                let Logic2Address, Logic2Contract;
                try {
                    Logic2Address = Logic2Artifact.networks[networkID].address;
                    Logic2Contract = new web3.eth.Contract(abi, Logic2Address);
                } catch (error) {
                    console.log(error);
                }

                ({ abi } = ProxyArtifact);
                let ProxyAddress, ProxyContract;
                try {
                    ProxyAddress = ProxyArtifact.networks[networkID].address;
                    ProxyContract = new web3.eth.Contract(abi, ProxyAddress);
                } catch (error) {
                    console.log(error);
                }

                dispatch({
                    type: 'init',
                    data: {
                        Logic1Artifact, Logic2Artifact, ProxyArtifact,
                        Logic1Contract, Logic2Contract, ProxyContract,
                        Logic1Address, Logic2Address, ProxyAddress,
                        web3, networkID, accounts
                    }
                })
            }
        }, [])

    useEffect(() => {
        const tryInit = async () => {
            try {
                const Logic1Artifact = require('../contracts/Logic1.json');
                const Logic2Artifact = require('../contracts/Logic2.json');
                const ProxyArtifact = require('../contracts/Proxy.json');
                init(Logic1Artifact, Logic2Artifact, ProxyArtifact);
            } catch (error) {
                console.log(error);
            }
        }
        tryInit();
    }, [init])

    useEffect(() => {
        const events = ["chainChanged", "accountsChanged"];
        const handleChange = () => {
            init(state.Logic1Artifact, state.Logic2Artifact, state.ProxyArtifact);
            const accounts = null;
            localStorage.removeItem('Address');
            dispatch({
                type: 'logout',
                data: { accounts }
            })
        };

        events.forEach(e => { window.ethereum.on(e, handleChange) });
        return () => {
            events.forEach(e => window.ethereum.removeListener(e, handleChange));
        };
    }, [init, state.Logic1Artifact, state.Logic2Artifact, state.ProxyArtifact]);

    const logIn = async () => {
        try {
        const accounts = await state.web3.eth.requestAccounts();
        localStorage.setItem('Address', accounts[0]);
            dispatch({
                type: 'login',
                data: { accounts }
            })
        } catch (error) {
            console.log(error);
        }

    }

    const logOut = async () => {
        try {
            const accounts = null;
            localStorage.removeItem('Address');
            dispatch({
                type: 'logout',
                data: { accounts }
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <MetaContext.Provider value={{ state, dispatch, logIn, logOut }}>
            {children}
        </MetaContext.Provider>


    )
}

export default MetaProvider;