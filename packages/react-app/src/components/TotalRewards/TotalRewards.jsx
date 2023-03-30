import classes from "./TotalRewards.module.scss";
import { ButtonPrimary } from "../index";
import Typography from "@mui/material/Typography";
import { useEthers } from "@usedapp/core";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { ethers } from "ethers";
import useGetTotalRewards from "../../hooks/useGetTotalRewards";

export default function TotalRewards(props) {
  const { account, library } = useEthers();
  //const [loading, setLoading] = useState(false);
  const plan = props.plan;
  const totalRewardsValue = useGetTotalRewards(plan);
  console.log("totalRewards", totalRewardsValue);

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
      <h2 style={{ padding: "0.7rem" }}>YOUR REWARDS</h2>
      {account ? (
        <div>
          <Typography
            sx={{ textAlign: "center", fontSize: "16px" }}
            variant="h6"
            component="h6"
          >
            TOTAL :
          </Typography>

          <Typography variant="h6" component="h6" sx={{ color: "#7b9c13" }}>
            {totalRewardsValue &&
              ethers.utils.formatEther(totalRewardsValue[0])}
          </Typography>

          <Typography
            sx={{ textAlign: "center", fontSize: "16px" }}
            variant="h6"
            component="h6"
          >
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
        <ButtonPrimary onClick={onClaim}>CLAIM</ButtonPrimary>
      </div>
    </div>
  );
}
