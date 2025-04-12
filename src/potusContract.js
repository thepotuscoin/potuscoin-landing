import { Contract } from 'ethers';
import potusAbi from './potusAbi.json';
import { getSigner } from './ethConfig.js';

const contractAddress = '0x39e802e4dC46486F23351f6ae054814787D7c6fc';

async function getPotusContract() {
  const signer = await getSigner();
  return new Contract(contractAddress, potusAbi, signer);
}

export default getPotusContract;
