import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Token, Pair, Route, Trade, TradeType, TokenAmount } from '@pancakeswap-libs/sdk';

const Swap = ({ provider }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');

  const handleInputAmountChange = (event) => {
    setInputAmount(event.target.value);
  };

  const handleSwap = async () => {
    const inputTokenAddress = inputToken;
    const outputTokenAddress = outputToken;

    const inputToken = new Token(1, inputTokenAddress, 18);
    const outputToken = new Token(1, outputTokenAddress, 18);

    const pair = await Pair.fetchData(inputToken, outputToken, provider);

    const route = new Route([pair], inputToken);

    const trade = new Trade(route, new TokenAmount(inputToken, ethers.utils.parseUnits(inputAmount, 18)), TradeType.EXACT_INPUT);

    setOutputAmount(ethers.utils.formatUnits(trade.outputAmount.toExact(), 18));
  };

  return (
    <div>
      <label>
        Input Amount:
        <input value={inputAmount} onChange={handleInputAmountChange} />
      </label>
      <br />
      <label>
        Output Amount:
        <input value={outputAmount} disabled />
      </label>
      <br />
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};

export default Swap;
