import './App.css';
import { useState } from 'react';
import Select from 'react-select';

function SwapForm({tokenInfo}){
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleSwap = (event) => {
    event.preventDefault();

    if (fromCurrency === toCurrency) {
      setResult('Please select different currencies');
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

  return (
    <div className="container">
      <h1>Currency Swap</h1>
      <form onSubmit={handleSwap}>
        <CurrencySelect
          label="From"
          currency={fromCurrency}
          onCurrencyChange={(selectedOption) => setFromCurrency(selectedOption.value)}
          tokens={tokenInfo}
        />
        <CurrencySelect
          label="To"
          currency={toCurrency}
          onCurrencyChange={(selectedOption) => setToCurrency(selectedOption.value)}
          tokens={tokenInfo}
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
  const options = Object.keys(tokens).map((key) => ({
    value: key,
    label: key,
    image: tokens[key].image,
  }));

  return (
    <div className="form-group">
      <label htmlFor={`${label.toLowerCase()}-currency`}>{label}:</label>

      <Select
        id={`${label.toLowerCase()}-currency`}
        value={options.find(option => option.value === currency)}
        onChange={onCurrencyChange}
        options={options}
        formatOptionLabel={({ value, label, image }) => (
          <div className="option-label">
            <img src={image} alt={label} className="token-image" />
            {value}
          </div>
        )}
      />

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


const SwapResult = ({ result }) => {
  return (
    <div className="form-group result">
      <p id="result">{result}</p>
    </div>
  );
};

const normalizeTokenName = (name) => {
  return name.toUpperCase();
};


//assume prices in this case are fixed
const response = await fetch('https://interview.switcheo.com/prices.json');
const data = await response.json();

const uniqueTokens = {};
data.forEach(token => {
  const normalizeName = normalizeTokenName(token.currency)
  if (!uniqueTokens[normalizeName]) {

    uniqueTokens[normalizeName] = {
      ...token,
      image: require(`./images/${normalizeName}.svg`),
    };
  }

});

function App() {
  return (
    <div>
      <SwapForm tokenInfo={uniqueTokens}/>
    </div>
  );
}

export default App;