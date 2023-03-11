import classes from "./TotalRewards.module.scss";
import { Button } from "../index";
import Typography from "@mui/material/Typography";
import { useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { useState, useContext } from "react";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { PlanContext } from "../../App";
import { ethers } from "ethers";

export default function TotalRewards() {
  const { account, chainId, library } = useEthers();
  const [loading, setLoading] = useState(false);
  const plan = useContext(PlanContext);
  const { error: totalRewardsError, value: totalRewardsValue } =
    useCall(
      account && {
        contract: new Contract(addresses.staking, abis.staking),
        method: "getEarnedRewards",
        args: [plan, account],
      }
    ) ?? {};

  if (totalRewardsError) {
    console.log(totalRewardsError);
  } else {
  }
  const onClaim = async () => {
    if (account) {
      const signer = library.getSigner();
      const mutantsStakingContract = new ethers.Contract(
        addresses.staking,
        abis.staking,
        signer
      );
      if (Number(totalRewardsValue[0]) > 0) {
        try {
          await mutantsStakingContract.claimEarnedReward(plan);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className={classes["prize-container"]}>
      <h4 style={{ padding: "0.7rem" }}>YOUR REWARDS</h4>
      {account ? (
        <div>
          <Typography sx={{ fontSize: "16px" }} variant="h6" component="h6">
            TOTAL :
          </Typography>

          <Typography variant="h6" component="h6" sx={{ color: "#7b9c13" }}>
            {totalRewardsValue &&
              ethers.utils.formatEther(totalRewardsValue[0])}
          </Typography>

          <Typography sx={{ fontSize: "16px" }} variant="h6" component="h6">
           CLAIMABLE :
          </Typography>

          <Typography variant="h6" component="h6" sx={{ color: "#7b9c13" }}>
            {totalRewardsValue &&
              ethers.utils.formatEther(totalRewardsValue[1])}
          </Typography>
        </div>
        
      ) : (
        <p>Nothing to show</p>
      )}

      <div className={classes.actions}>
        <Button onClick={onClaim}>Claim</Button>
      </div>
    </div>
  );
}
