import React, { useEffect, useState } from "react";
import "./style.css";
import getPotusContract from "./potusContract";
import { ethers } from "ethers";
import { getSigner } from "./ethConfig";
import yesAbi from "./yesAbi.json";
import noAbi from "./noAbi.json";

const YES_CONTRACT = "0xDEf30667A2EE9BFF0d5b4204c37b904758A078C4";
const NO_CONTRACT  = "0xD95F2dC19969d6BbFE403A061035173f653Da4e2";

function App() {
  const [name, setName] = useState("Loading...");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState("");
  const [voteStats, setVoteStats] = useState({ yes: 0, no: 0 });
  const [animatedYes, setAnimatedYes] = useState(0);
  const [animatedNo, setAnimatedNo] = useState(0);

  useEffect(() => {
    if (walletConnected) {
      fetchTokenDetails();
      fetchVoteStats();
    }
  }, [walletConnected]);

  const fetchTokenDetails = async () => {
    try {
      const contract = await getPotusContract();
      const name = await contract.getFunction("name")();
      const symbol = await contract.getFunction("symbol")();
      const totalSupply = await contract.totalSupply();

      setName(name);
      setSymbol(symbol);
      setSupply(ethers.formatUnits(totalSupply, 18));
    } catch (err) {
      console.error("Failed to fetch token data", err);
      setName("Unavailable");
      setSymbol("N/A");
      setSupply("N/A");
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setWalletConnected(true);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const vote = async (type) => {
    try {
      setVoting(true);
      setMessage("");

      const signer = await getSigner();
      const contract = new ethers.Contract(
        type === "yes" ? YES_CONTRACT : NO_CONTRACT,
        type === "yes" ? yesAbi : noAbi,
        signer
      );

      const tx = await contract.castVote(type === "yes");
      setMessage("Waiting for confirmation...");
      await tx.wait();

      setMessage(`Vote ${type.toUpperCase()} cast successfully!`);
      fetchVoteStats();
    } catch (err) {
      console.error("Voting failed:", err);
      setMessage("Vote failed. Please ensure you hold enough $POTUS.");
    } finally {
      setVoting(false);
    }
  };

  const animateCount = (target, setter) => {
    let current = 0;
    const step = target / 20;

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setter(target);
        clearInterval(interval);
      } else {
        setter(Math.floor(current));
      }
    }, 30);
  };

  const fetchVoteStats = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const yesContract = new ethers.Contract(YES_CONTRACT, yesAbi, provider);
      const noContract = new ethers.Contract(NO_CONTRACT, noAbi, provider);

      const yesLogs = await yesContract.queryFilter("VoteCasted");
      const noLogs = await noContract.queryFilter("VoteCasted");

      const allLogs = [...yesLogs, ...noLogs].sort((a, b) => a.blockNumber - b.blockNumber);

      const latestVotes = new Map();
      for (const log of allLogs) {
        const voter = log.args.voter;
        const approval = log.args.approval;
        latestVotes.set(voter, approval);
      }

      let yesCount = 0;
      let noCount = 0;
      for (const approval of latestVotes.values()) {
        if (approval) yesCount++;
        else noCount++;
      }

      setVoteStats({ yes: yesCount, no: noCount });

      setTimeout(() => {
        animateCount(yesCount, setAnimatedYes);
        animateCount(noCount, setAnimatedNo);
      }, 100);

    } catch (err) {
      console.error("Error fetching vote stats:", err);
    }
  };

  const getPercentage = (value, total) => {
    if (total === 0) return "0%";
    return `${Math.round((value / total) * 100)}%`;
  };

  const getYesColor = () => {
    const total = animatedYes + animatedNo;
    if (total === 0) return "";
    const percent = (animatedYes / total) * 100;
    return percent >= 50 ? "green-text" : "red-text";
  };
  
  const getNoColor = () => {
    const total = animatedYes + animatedNo;
    if (total === 0) return "";
    const percent = (animatedNo / total) * 100;
    return percent >= 50 ? "green-text" : "red-text";
  };
  
  
  return (
    <div id="app">
    
    <video
  id="background-video"
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/background-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

 

      {!walletConnected ? (
        <>
          <header>POTUS Coin</header>
          <video className="hero-video" src="/logo.mp4" autoPlay loop muted playsInline />
          <h2 className="tagline">The Blockchain-Based Presidential Approval Tracker</h2>
          <div className="connect-wallet">
            <button onClick={handleConnectWallet}>🔗 Connect Wallet</button>
          </div>
        </>
      ) : (
        <>
          <header>{name} ({symbol})</header>
          <video className="hero-video" src="/logo.mp4" autoPlay loop muted playsInline />

          <section id="about">
            <h2>About {name}</h2>
            <p>POTUS Coin is the first decentralized meme coin that tracks the real-time approval of the sitting U.S. President. Every wallet holding $POTUS has the power to cast a vote—without the influence of media bias, corporate polling firms, or centralized platforms.</p>
            <p>The result is a transparent, community-powered approval rating system that lives on the blockchain, making presidential sentiment open, immutable, and visible to all.</p>
          </section>

          <section id="how-it-works">
            <h2>How It Works</h2>
            <p>To participate in presidential sentiment voting, all you need is a crypto wallet and at least 5 $POTUS tokens. Once connected, you’ll be able to cast your vote for YES or NO in response to the approval question.</p>
            <p>Your vote is securely recorded on the blockchain, and you can change it at any time. The live approval rating updates in real-time based on the community’s most recent votes.</p>
          </section>

          <section id="live-rating">
            <h2>Live Approval Rating</h2>
            <p>These real-time percentages reflect how $POTUS holders feel about the current President’s performance. Only active votes from verified token holders are counted—ensuring the data is accurate and up to date.</p>
            <div className="rating-display">
            <span className={getYesColor()}>
            <span className="label"><strong>YES:</strong></span> {getPercentage(animatedYes, animatedYes + animatedNo)}
           </span>
             {" "}
            |{" "}
            <span className={getNoColor()}>
            <span className="label"><strong>NO:</strong></span> {getPercentage(animatedNo, animatedYes + animatedNo)}
           </span>

        </div>

            <p><strong>Total Supply:</strong> {supply}</p>
          </section>

          <section id="vote-now">
            <h2>Vote Now</h2>
            {(voteStats.yes > 0 || voteStats.no > 0) && (
            <div className="voted-badge">
            <a href="/voter-access">
            <img src="/i-voted-badge.png" alt="I Voted Badge" />
          </a>
            <p className="badge-caption">Click badge to access exclusive voter perks</p>
          </div>
            )}

            <p className="voting-question">Do you believe the current President of the United States is doing a good job overall?</p>
            <div className="vote-buttons">
              <button className="vote-yes" onClick={() => vote("yes")} disabled={voting}>👍 Vote YES</button>
              <button className="vote-no" onClick={() => vote("no")} disabled={voting}>👎 Vote NO</button>
            </div>
            {message && <p className="vote-message">{message}</p>}
          </section>
        </>
      )}

      <section id="tokenomics">
        <h2>Tokenomics</h2>
        <div className="tokenomics-grid">
          <div className="tokenomics-box"><strong>60%</strong><span>Public Distribution</span></div>
          <div className="tokenomics-box"><strong>20%</strong><span>Ecosystem & Rewards</span></div>
          <div className="tokenomics-box"><strong>10%</strong><span>Project Development</span></div>
          <div className="tokenomics-box"><strong>5%</strong><span>Liquidity Provision</span></div>
          <div className="tokenomics-box"><strong>5%</strong><span>Team & Advisors</span></div>
        </div>
      </section>

      <footer>
        <div className="social-icons">
          <a href="https://discord.gg/phDbNyBZhz" target="_blank" rel="noopener noreferrer"><img src="/discord-icon.png" alt="Discord" /></a>
          <a href="https://x.com/thepotuscoin?s=21&t=M8NqdnhMzSHP25y0u7NoEw" target="_blank" rel="noopener noreferrer"><img src="/x-icon.png" alt="X (Twitter)" /></a>
          <a href="https://www.facebook.com/share/g/14u92WeWG4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><img src="/facebook-icon.png" alt="Facebook" /></a>
          <a href="https://t.me/thepotuscoin" target="_blank" rel="noopener noreferrer"><img src="/telegram-icon.png" alt="Telegram" /></a>
          <a href="https://www.tiktok.com/@thepotuscoin?_t=ZT-8vM9XYtaJ4Q&_r=1" target="_blank" rel="noopener noreferrer"><img src="/tiktok-icon.png" alt="TikTok" /></a>
          <a href="https://www.reddit.com/r/thePOTUScoin/s/n6cTUOlpkf" target="_blank" rel="noopener noreferrer"><img src="/reddit-icon.png" alt="Reddit" /></a>
          <a href="https://www.instagram.com/thepotuscoin?igsh=MTQ1aGVvZWJzdmo2&utm_source=qr" target="_blank" rel="noopener noreferrer"><img src="/instagram-icon.png" alt="Instagram" /></a>
        </div>
        <p>
  &copy; 2025 POTUS Coin. All rights reserved. |
  <a href="/privacy"> Privacy Policy</a> |
  <a href="/terms"> Terms of Service</a> | 
  <a href="/whitepaper.pdf"> Whitepaper</a>
</p>

      </footer>
    </div>
  );
}

export default App;
