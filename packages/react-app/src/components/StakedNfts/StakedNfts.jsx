import { StakedImageList } from "../StakedImageList/StakedImageList";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./StakedNfts.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import { useCall, useEthers, useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { Button, ButtonGreen } from "../index";
import { ethers } from "ethers";
import { useGetIsApprovedForAll } from "../../hooks/useGetIsApprovedForAll";
import { UnstakedImageList } from "../UnstakedImageList/UnstakedImageList";
import { PlanContext } from "../../App";

export default function StakedNfts(props) {
  const [tokensOfOwner, setTokensOfOwner] = useState([]);
  const [unstakedTokensOfOwner, setUnstakedTokensOfOwner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const plan = useContext(PlanContext);
  const [selectedStakeNFT, setSelectedStakeNFT] = useState([]);
  const [selectedUnstakeNFT, setSelectedUnstakeNFT] = useState([]);
  const { account, chainId, library } = useEthers();
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "15px",
  };

  const mutantsContract = new Contract(addresses.mutants, abis.mutants);

  const isApprovedForAll = useGetIsApprovedForAll(
    addresses.mutants,
    abis.mutants,
    addresses.staking,
    account
  );

  const { error: walletOfOwnerError, value: walletOfOwnerValue } =
    useCall(
      account && {
        contract: new Contract(addresses.mutants, abis.mutants),
        method: "tokensOfOwner",
        args: [account],
      }
    ) ?? {};

  if (walletOfOwnerError) {
    console.log(walletOfOwnerError);
  }

  const { error: stakedNftsError, value: stakedNftsValue } =
    useCall(
      account && {
        contract: new Contract(addresses.staking, abis.staking),
        method: "getStakedTokens",
        args: [plan, account],
      }
    ) ?? {};

  if (stakedNftsError) {
    console.log(stakedNftsError);
  }

  const { state: setApprovalForAllState, send: setApprovalForAll } =
    useContractFunction(mutantsContract, "setApprovalForAll", {
      transactionName: "setApprovalForAll",
    });

  const handleClose = () => setOpen(false);

  const approveMaxMutants = async () => {
    await setApprovalForAll(addresses.staking, 1);
  };

  async function getNftsData(userNfts) {
    const tokenData = [];
    for (var j = 0; j < userNfts?.length; j++) {
      const mutantsMetaData = await axios.get(
        `https://drunkskunksdc.mypinata.cloud/ipfs/QmadV6pf2fzgmo3NDbx5fuyxNZUcTaNiGSKbNx3FoWkgAG/${userNfts[j]}.json`
      );
      const nftTokenData = {
        img: `https://drunkskunksdc.mypinata.cloud/ipfs/${mutantsMetaData.data.image.slice(
          7
        )}`,
        title: mutantsMetaData.data.name,
        tokenId: userNfts[j],
      };
      tokenData.push(nftTokenData);
    }

    return tokenData;
  }

  const handleChange = (event) => {
    event.target.checked ? props.setPlan(1) : props.setPlan(0);
  };

  const onPickClick = async () => {
    if (account) {
      setStakeLoading(true);
      if (isApprovedForAll === undefined) {
        setLoading(true);
      } else {
        setOpen(true);
        setLoading(true);
        setSelectedUnstakeNFT([]);
        const allNfts = walletOfOwnerValue?.[0].map((e) => Number(e));
        const tokensOfOwner = await getNftsData(allNfts);
        setUnstakedTokensOfOwner(tokensOfOwner);
        setLoading(false);
      }
    }
    setStakeLoading(false);
  };

  const onStake = async () => {
    const signer = library.getSigner();
    const mutantsStakingContract = new ethers.Contract(
      addresses.staking,
      abis.staking,
      signer
    );
    if (selectedStakeNFT.length > 0) {
      try {
        console.log("plan", plan);
        console.log("selected Stake NFT", selectedStakeNFT);
        await mutantsStakingContract.stake(plan, selectedStakeNFT);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onUnstake = async () => {
    const signer = library.getSigner();
    const mutantsStakingContract = new ethers.Contract(
      addresses.staking,
      abis.staking,
      signer
    );
    if (selectedUnstakeNFT.length > 0) {
      setUnstakeLoading(true);
      try {
        await mutantsStakingContract.unstake(plan, selectedUnstakeNFT);
        setUnstakeLoading(false);
      } catch (error) {
        console.log(error);
        setUnstakeLoading(false);
      }
    }
  };

  const onSelect = async () => {
    setConfirmLoading(true);
    if (isApprovedForAll === false) {
      await approveMaxMutants();
      await onStake();
      setConfirmLoading(false);
      setOpen(false);
      return;
    }
    await onStake();
    setConfirmLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    if (account) {
      const stakedNfts = stakedNftsValue?.[0].map((e) => Number(e));
      console.log("staked nfts", stakedNfts);
      getData(stakedNfts);
    }

    async function getData(stakedNfts) {
      const tokenData = await getNftsData(stakedNfts);
      setTokensOfOwner(tokenData);
    }
  }, [account, stakedNftsValue]);

  return (
    <div className={classes.container}>
      <h4>Your staked mutants</h4>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch defaultChecked color="warning" onChange={handleChange} />
          }
          label="High APR (30 days lock)"
        />
      </FormGroup>
      {stakedNftsValue?.[0].length > 0 ? (
        loading ? (
          <div className={classes.loading}>
            <Typography
              sx={{ marginBottom: "35px" }}
              variant="h6"
              component="h4"
            >
              Fetching your staked mutants...
            </Typography>
            <CircularProgress color="warning"/>
          </div>
        ) : (
          <StakedImageList
            selectedUnstakeNFT={selectedUnstakeNFT}
            setSelectedUnstakeNFT={setSelectedUnstakeNFT}
            itemData={tokensOfOwner}
          />
        )
      ) : (
        <p>Nothing to show</p>
      )}
      <div className={classes.actions}>
        <Button onClick={onPickClick}>
          {stakeLoading ? <CircularProgress color="warning"/> : "STAKE"}
        </Button>
        <ButtonGreen onClick={onUnstake}>
          {unstakeLoading ? <CircularProgress color="warning"/> : "UNSTAKE"}
        </ButtonGreen>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              SELECT YOUR MUTANT TO STAKE:
            </Typography>
            {plan === 1 && (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span style={{ color: "red" }}>WARNING :</span> There will be a
                90% fee if you claim or withdraw before 30 days with the current
                plan.
              </Typography>
            )}
            <UnstakedImageList
              itemData={unstakedTokensOfOwner}
              selectedStakeNFT={selectedStakeNFT}
              setSelectedStakeNFT={setSelectedStakeNFT}
              loading={loading}
            />
            <Button style={{ float: "right" }} onClick={onSelect}>
              {confirmLoading ? <CircularProgress color="warning"/> : "CONFIRM"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
