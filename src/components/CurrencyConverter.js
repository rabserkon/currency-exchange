import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import './changeStyle.css'

const CurrencyConverter = () => {

    const currencyList = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'NZD', name: 'New Zealand Dollar' },
    ];
    const [amount, setAmount] = useState('');
    const [ result, setResult] = useState('');
    const [category, setCategory] = useState('General');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [currencyOptions, setCurrencyOptions] = useState(currencyList);


    useEffect(() => {
        setCurrencyOptions(currencyList);
    }, []);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`);
            const rates = response.data.rates;
            setExchangeRate(rates[toCurrency]);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    useEffect(() => {
        if (fromCurrency !== toCurrency) {
            fetchExchangeRate();
        } else {
            setExchangeRate(1);
        }
    }, [fromCurrency, toCurrency]);

    const handleConvert = async () => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`);
            const rate = response.data.rates[toCurrency.toUpperCase()];
            if (rate) {
                setResult(`${(amount * rate).toFixed(2)} ${toCurrency.toUpperCase()}`);
            } else {
                setResult('Invalid currency code.');
            }
        } catch (error) {
            setResult('Error fetching conversion rate.');
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <Container className={"change-main"} style={{display: "flex", justifyContent: "center"}}>
            <Card className={"change-card"}>
            <Row className="justify-content-center" style={{display: "flex", justifyContent: "center"}}>
                    <h2 style={{display: "block"}} className="mb-4">Currency Converter</h2>
                    <Form>
                        <h5 className="mb-3">Отдаешь</h5>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {currencyList.map((currency) => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.code}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder={`amount`}
                            />
                        </Form.Group>
                        <h5 className="mb-3">Получаешь</h5>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {currencyList.map((currency) => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.code}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                disabled
                                value={result}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`amount`}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleConvert}>Convert</Button>
                    </Form>
            </Row>
            </Card>
        </Container>
    );
};

export default CurrencyConverter;