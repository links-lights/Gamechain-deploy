import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Game from "./Game";
import TokenAward from "./TokenAward";
import { Paper, Grid, Button } from "@mui/material";
import { changeUser, fetchUser, createUser } from "../db/models/user";

function StartPage() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [user, setUser] = useState({});
  const [gameStart, setGameStart] = useState(false);

  const drizzleInstance = drizzleReactHooks.useDrizzle();

  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
    status: drizzleState.drizzleStatus,
  }));
  console.log("this is high score is startPage", highScore, rewardAmount);
  const contracts = drizzleInstance.drizzle.contracts;
  const account = drizzleState.accounts[0];

  useEffect(() => {
    (async () => {
      if (account) {
        let _user = (await fetchUser(account))[0];
        if (_user === undefined) {
          _user = (
            await createUser(
              account,
              account,
              "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe",
              0
            )
          )[0];
        }
        setUser(_user);
        if (_user.score) {
          setHighScore(_user.score);
        }
      }
    })();
  }, [highScore, account]);

  function awardAmount(amount) {
    setRewardAmount(amount);
  }

  async function postHighScore() {
    console.log("postHighScore fired");
    try {
      if (score > highScore) {
        setHighScore(score);
        await changeUser(account, user.username, user.imageHash, score);
      }
    } catch (err) {
      alert(err);
    }
  }

  function checkInitialize() {
    if (drizzleState.status.initialized) {
      const arrow_keys_handler = function (e) {
        switch (e.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Space":
            e.preventDefault();
            break;
          default:
            break;
        }
      };
      window.addEventListener("keydown", arrow_keys_handler, false);

      setGameStart(!gameStart);
    } else alert("Account not loaded, please try again");
  }

  return (
    <Paper
      sx={{
        minHeight: "50vw",
      }}
    >
      <Grid container direction="column" className="sections">
        <Grid
          item
          className="topSpacer"
          sx={{
            height: "5vw",
            border: "1px solid black",
          }}
        />
        <Grid
          item
          container
          className="GameArea"
          sx={{ border: "1px solid black", minHeight: "30vw" }}
        >
          <Grid item xs={2}>
            Token Earnings:
          </Grid>
          <Grid
            item
            xs={8}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ border: "1px solid black" }}
          >
            {gameStart ? (
              <Game
                contracts={contracts}
                account={account}
                awardAmount={awardAmount}
                highScore={postHighScore}
                setScore={setScore}
              />
            ) : (
              <Button onClick={() => checkInitialize()}>Start Game</Button>
            )}
          </Grid>
          <Grid item xs={2}>
            <TokenAward highScore={highScore} rewardAmount={rewardAmount} />
          </Grid>
        </Grid>
        <Grid item className="footer" sx={{ border: "1px solid black" }}>
          {/* Enhancement: More information here */}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StartPage;
