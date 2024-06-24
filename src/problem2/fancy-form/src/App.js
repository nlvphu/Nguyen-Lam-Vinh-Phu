import './App.css';
import { useState } from 'react';

function SwapForm({tokenInfo}){
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleSwap = (event) => {
    event.preventDefault();

    if (fromCurrency === toCurrency) {
      setResult('Please select different currencies.');
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setResult('Please enter a valid amount.');
      return;
    }

    const fromPrice = tokenInfo[fromCurrency].price;
    const toPrice = tokenInfo[toCurrency].price;
    const convertedAmount = (amountNumber * fromPrice) / toPrice;

    setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(6)} ${toCurrency}`);
  };

  const getValidTokens = () => {
    return Object.keys(tokenInfo);
  };

  const validTokens = getValidTokens().map((token) => ({
    name: tokenInfo[token].currency,
    image: tokenInfo[token].image,
  }));

  return (
    <div className="container">
      <h1>Currency Swap</h1>
      <form onSubmit={handleSwap}>
        <CurrencySelect
          label="From"
          currency={fromCurrency}
          onCurrencyChange={(e) => setFromCurrency(e.target.value)}
          tokens={validTokens}
        />
        <CurrencySelect
          label="To"
          currency={toCurrency}
          onCurrencyChange={(e) => setToCurrency(e.target.value)}
          tokens={validTokens}
        />
        <AmountInput
          amount={amount}
          onAmountChange={(e) => setAmount(e.target.value)}
        />
        <div className="form-group">
          <button type="submit">Swap</button>
        </div>
        <SwapResult result={result} />
      </form>
    </div>
  );
}

function CurrencySelect({label, currency, onCurrencyChange, tokens}){
  return (
    <div className="form-group">
      <label htmlFor={`${label.toLowerCase()}-currency`}>{label}:</label>
      <select
        id={`${label.toLowerCase()}-currency`}
        value={currency}
        onChange={onCurrencyChange}
        required
      >
        <option value="">Select Currency</option>
        {tokens.map((token) => (
          <option key={token.name} value={token.name}>
            {token.image && <img src={token.image} alt={token.name} className="token-image" />}
            {token.name}
          </option>
        ))}

      </select>
    </div>
  );
}

const AmountInput = ({ amount, onAmountChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="amount">Amount to Input:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={onAmountChange}
        required
        min="0.01"
        step="0.01"
      />
    </div>
  );
};

function calculateExchangeRate({amount, fromPrice, toPrice}){
  return amount * (fromPrice/toPrice);
}

const SwapResult = ({ result }) => {
  return (
    <div className="form-group result">
      <p id="result">{result}</p>
    </div>
  );
};

const normalizeTokenName = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

const response = await fetch('https://interview.switcheo.com/prices.json');
const data = await response.json();

const uniqueTokens = {};
data.forEach(token => {
  const normalizeName = normalizeTokenName(token.currency)
  if (!uniqueTokens[normalizeName]) {
    uniqueTokens[normalizeName] = {
      ...token,
      image: require(`../public/images/${normalizeName}.svg`).default,
    };
  }
});



console.log(data)
console.log(uniqueTokens)

function App() {
  return (
    <div>
      <SwapForm tokenInfo={data}/>
    </div>
  );
}

export default App;