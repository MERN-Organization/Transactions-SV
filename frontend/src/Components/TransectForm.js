import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Alert,
} from 'react-bootstrap';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import TransactionDetails from './TransactionDetails';

const TransectForm = () => {
    const apiURL = 'http://localhost:3001/api/transactions';
    const [processingCode, setProcessingCode] = useState(null);
    const [systemTraceNumber, setSystemTraceNumber] = useState(null);
    const [functionCode, setFunctionCode] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [cardHolderName, setCardHolderName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [currencyCode, setCurrencyCode] = useState(null);
    const [unEnrichData, setUnEnrichData] = useState(false);
    const [responceData, setResponceData] = useState(false);
    const [transactionData, setTransactionData] = useState(false);
    const Navigate = useNavigate();

    const encryptData = (data) => {
        return CryptoJS.AES.encrypt(
            data,
            localStorage.getItem('encryption_token')
        ).toString();
    };

    const turnOnAutomaticLogout = () => {
        setTimeout(() => {
            logout();
            Navigate('/');
        }, 10000);
    };

    const logoutAndClearData = () => {
        deleteCookie('encryption_token');
        deleteLocalStorage('encryption_token');
    };

    const deleteLocalStorage = (name) => {
        localStorage.removeItem(name);
    };

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const logout = () => {
        logoutAndClearData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isEmpty(
                processingCode &&
                    systemTraceNumber &&
                    functionCode &&
                    cardNumber &&
                    cardHolderName &&
                    amount &&
                    currencyCode
            )
        ) {
            const obj = {
                processingCode: processingCode,
                systemTraceNumber: systemTraceNumber,
                functionCode: functionCode,
                cardNumber: cardNumber,
                cardHolderName: cardHolderName,
                amount: amount,
                currencyCode: currencyCode
            };

            const encryptedObject = await encryptData();
            let formData = new FormData();

            formData.append('formData', encryptedObject);

            if (encryptedObject) {
                axios
                    .post(apiURL, formData, { withCredentials: true })
                    .then((resp) => {
                        if (resp.status === 201) {
                            setResponceData(true);
                            setTransactionData(resp.data);
                            turnOnAutomaticLogout();
                        }
                    })
                    .catch((err) => {
                        console.log('error happend While Submitting Data', err);
                    });
            }
        } else {
            setUnEnrichData(true);
        }
    };

    return (
        <>
            {responceData && (
                <aside>
                    <TransactionDetails transactionData={transactionData} />
                </aside>
            )}
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col md={6}>
                        <h1>Make Transaction</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Processing Code</Form.Label>
                                <Form.Control
                                    name="processingCode"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setProcessingCode(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>System Trace Number</Form.Label>
                                <Form.Control
                                    name="systemNo"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setSystemTraceNumber(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Function Code</Form.Label>
                                <Form.Control
                                    name="FuncCode"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setFunctionCode(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    name="CardNo"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setCardNumber(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Card Holder</Form.Label>
                                <Form.Control
                                    name="CardHolder"
                                    required
                                    type="text"
                                    onChange={(e) => {
                                        setCardHolderName(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Transaction Amount</Form.Label>
                                <Form.Control
                                    name="amount"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Currency Code</Form.Label>
                                <Form.Control
                                    name="CurrencyCode"
                                    required
                                    type="number"
                                    onChange={(e) => {
                                        setCurrencyCode(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Col>
                </Row>
                {unEnrichData && (
                    <Alert show={true} variant="danger">
                        Please Fill In All the Details
                    </Alert>
                )}
            </Container>
        </>
    );
};

export default TransectForm;
