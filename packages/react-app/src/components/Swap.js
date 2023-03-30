import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components'
import { Button, Card, CardBody, Flex, Heading, Text, Input, TokenImage, SwapVertIcon } from '@pancakeswap/uikit';
import { dark } from '@pancakeswap/uikit'
import { ButtonPrimary } from '.';
import BNB from '../assets/images/bnb.png';
import STINK from '../assets/images/logo.jpg';
import { border } from '@mui/system';

const Swap = () => {
  const [fromToken, setFromToken] = useState('BNB');
  const [toToken, setToToken] = useState('STINK');
  const [fromTokenLogo, setFromTokenLogo] = useState(BNB);
  const [toTokenLogo, setToTokenLogo] = useState(STINK);
  const [fromTokenAmount, setFromTokenAmount] = useState('');
  const [toTokenAmount, setToTokenAmount] = useState('');

  const handleFromTokenAmountChange = (e) => {
    setFromTokenAmount(e.target.value);
  };

  const handleToTokenAmountChange = (e) => {
    setToTokenAmount(e.target.value);
  };

  const handleSwap = () => {
    // Do the swap
    console.log(`Swapping ${fromTokenAmount} ${fromToken} for ${toTokenAmount} ${toToken}`);
  };

  const handleSwitchTokens = () => {
    // Switch the from and to tokens
    const tempToken = fromToken;
    const tempAmount = fromTokenAmount;
    const tempLogo = fromTokenLogo;
    setFromToken(toToken);
    setFromTokenLogo(toTokenLogo)
    setToTokenLogo(tempLogo)
    setToToken(tempToken);
    setFromTokenAmount(toTokenAmount);
    setToTokenAmount(tempAmount);

  };

  return (
    <ThemeProvider theme={dark}>
      <Card style={{
        marginTop: "56px",
        marginBottom: "100px",
        background: "#020202",
        border: "1px solid #bfc500"
      }}>
        <CardBody style={{
          background: "#020202",
          padding: "18px"
        }}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading>Swap</Heading>
          </Flex>
          <Text>Buy and sell $STINK</Text>
          <Flex flexDirection="column" mt="24px">
            <Flex justifyContent="space-between">
              <Text>From</Text>
              <Text>{`Balance: 100.0 ${fromToken}`}</Text>
            </Flex>
            <Flex mb="16px" alignItems="center">
              <Input style={{ marginBlock: "8px" }} type="number"
                placeholder="0.0"
                value={fromTokenAmount}
                onChange={handleFromTokenAmountChange}
                mt="8px"
                flex="1" />
              <Text mx="8px">{fromToken}</Text>
              <TokenImage src={fromTokenLogo} height={35} width={35} title={"BNB"} />
            </Flex>
            <div style={{ margin: "auto" }} onClick={handleSwitchTokens}>
              <SwapVertIcon width="35px" />
            </div>
            <Flex justifyContent="space-between" mt="16px">
              <Text>To</Text>
              <Text>{`Balance: 100.0 ${toToken}`}</Text>
            </Flex>
            <Flex mb="24px" alignItems="center">

              <Input style={{ marginBlock: "8px" }} type="number"
                placeholder="0.0"
                value={toTokenAmount}
                onChange={handleToTokenAmountChange}
                flex="1" />
              <Text mx="8px">{toToken}</Text>
              <TokenImage src={toTokenLogo} height={35} width={35} title={"$STINK"} />

            </Flex>
            <ButtonPrimary onClick={handleSwap}>
              Swap
            </ButtonPrimary>
          </Flex>
        </CardBody>
      </Card>
    </ThemeProvider>
  );
};

export default Swap;