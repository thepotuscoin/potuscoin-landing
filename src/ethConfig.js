import { ethers } from 'ethers';

let provider;
let signer;

if (typeof window !== 'undefined' && window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);

  // You MUST wait for the user to connect MetaMask manually before calling getSigner()
  // We'll export a function to get the signer safely
}

async function getSigner() {
  if (!provider) {
    throw new Error("MetaMask is not available");
  }

  // Ask MetaMask to connect if not already connected
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  signer = await provider.getSigner();
  return signer;
}

export { provider, getSigner };
