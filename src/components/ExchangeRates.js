import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

const ExchangeRates = ({ baseCurrency }) => {
    const [rates, setRates] = useState({});
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

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                setRates(response.data.rates);
            } catch (error) {
                console.error('Error fetching exchange rates', error);
            }
        };

        fetchRates();
    }, [baseCurrency]);

    return (
        <div  className="mb-4"  style={{ width: "100%"}} >
             <h2 className="mb-4">Exchange Rates (Base: {baseCurrency.toUpperCase()})</h2>
            <Card className={"change-card"} >
                <Card.Body>
                    <ul className="list-unstyled">
                        {Object.entries(rates).map(([currency, rate]) => (
                            <li key={currency} className="mb-2">
                                1 {baseCurrency.toUpperCase()} = {rate} {currency}
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ExchangeRates;