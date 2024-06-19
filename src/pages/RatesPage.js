import React, { useState } from 'react';
import ExchangeRates from '../components/ExchangeRates';
import {Form} from "react-bootstrap";

const RatesPage = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
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

    return (
        <div style={{display: "flex", justifyContent: "center", flexWrap: 'wrap', width: '100%', marginTop: "20px"}}>
            <div className="mb-4" style={{display: "flex", justifyContent: "center", flexWrap: 'wrap', width: '500px'}}>
                <div style={{width: "100%"}}>
                    <h1 className="mb-4">Exchange Rates</h1>
                    <label>
                        Base Currency:
                        <Form.Group className="mb-3" style={{width: "100%"}}>
                            <Form.Control
                                style={{width: "100%"}}
                                as="select"
                                value={baseCurrency}
                                onChange={(e) => setBaseCurrency(e.target.value)}
                            >
                                {currencyList.map((currency) => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.code}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </label>
                </div>
                <ExchangeRates baseCurrency={baseCurrency} />
            </div>
        </div>

    );
};

export default RatesPage;