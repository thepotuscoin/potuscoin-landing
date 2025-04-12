import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getSigner } from "./ethConfig";
import yesAbi from "./yesAbi.json";
import noAbi from "./noAbi.json";
import { Link } from "react-router-dom";


const YES_CONTRACT = "0xDEf30667A2EE9BFF0d5b4204c37b904758A078C4";
const NO_CONTRACT = "0xD95F2dC19969d6BbFE403A061035173f653Da4e2";

function VoterAccess() {
  const [hasVoted, setHasVoted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const signer = await getSigner();
        const address = await signer.getAddress();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const yesContract = new ethers.Contract(YES_CONTRACT, yesAbi, provider);
        const noContract = new ethers.Contract(NO_CONTRACT, noAbi, provider);

        const votedYes = await yesContract.hasVoted(address);
        const votedNo = await noContract.hasVoted(address);

        setHasVoted(votedYes || votedNo);
      } catch (err) {
        console.error("Failed to check voting status:", err);
        setHasVoted(false);
      } finally {
        setChecking(false);
      }
    };

    checkVoteStatus();
  }, []);

  if (checking) {
    return <p style={{ textAlign: "center", color: "white" }}>Checking voter status...</p>;
  }

  if (!hasVoted) {
    return (
      <div style={{ textAlign: "center", color: "gold", marginTop: "3rem" }}>
        <Link to="/" className="home-link">🏠 Home</Link>
        <h2>Access Denied</h2>
        <p>You must cast a vote before accessing this page.</p>
        <a href="/" style={{ color: "#3b82f6", textDecoration: "underline" }}>Go Back to Vote</a>
      </div>
    );
  }

  return (
    <div className="voter-access">
        <Link to="/" className="home-link">🏠 Home</Link>
      <h1>🎖️ Exclusive Voter Access</h1>
      <p className="subtext">You’ve cast your vote — now take the next step.</p>

      <div className="voter-links">
        <div className="link-box">
          <h3>📢 Content Contributor Track</h3>
          <p>Submit memes, videos, or other creative material for token rewards.</p>
          <a href="https://discord.gg/acJFPHvQAY" target="_blank" rel="noreferrer">Join #content-reward-submissions</a>
        </div>

        <div className="link-box">
          <h3>🎁 Airdrop Eligibility</h3>
          <p>Get access to exclusive airdrops and community perks.</p>
          <a href="https://discord.gg/94bfVyFJn8" target="_blank" rel="noreferrer">Join #airdrops</a>
        </div>

        <div className="link-box">
          <h3>👥 Governance & Admin Interest</h3>
          <p>Help lead the future of POTUS Coin. Participate in DAO planning.</p>
          <a href="https://discord.gg/AQMPSR7W5f" target="_blank" rel="noreferrer">Join #admin-governance-dao</a>
        </div>
      </div>
    </div>
  );
}

export default VoterAccess;
