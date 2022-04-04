/* In this file we are exploring two approaches to load a contract from the contracts build directory
1. Using a truffle package known as "@truffle/contract".
2. Using web3 library

This package "@truffle/contract" is very large in size and hence it increases the bundle size.
So, we are going with the web3 approach.
**/

// import contract from "@truffle/contract";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

// This is how we can load a contract using the web3
export const loadContract = async (name, web3) => {
  let contract = null;
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    contract = new web3.eth.Contract(Artifact.abi, Artifact.networks[NETWORK_ID].address);
  } catch (error) {
    console.error("Error in loading the contract", error);
  }
  return contract;
};


// This is how we can load a contract using the package @truffle/contract
// export const loadContract = async (name, provider) => {
//   let deployedContract = null;
//   try {
//     const res = await fetch(`/contracts/${name}.json`);
//     const Artifact = await res.json();

//     const _contract = contract(Artifact);
//     _contract.setProvider(provider);

//     deployedContract = await _contract.deployed();
//   } catch (error) {
//     console.error("Error in loading the contract", error);
//   }
//   return deployedContract;
// };
