const initialState = {
    Logic1Artifact: null, Logic2Artifact: null, ProxyArtifact: null,
    Logic1Contract: null, Logic2Contract: null, ProxyContract: null,
    Logic1Address: null,  Logic2Address: null,  ProxyAddress: null,
    web3: null, networkID: null, accounts: null
};

const reducer = (state, action) => {
    const { type, data } = action;
    switch (type) {
        case 'init':
            return { ...state, ...data };
        case 'login':
            return { ...state, ...data };
        case 'logout':
            return { ...state, ...data };
        default:
            throw new Error("Undefined reducer action type");
    }
};

export {
    initialState,
    reducer
};
