const TransactionDetails = ({ transactionData }) => {
    return (
        <>
            You Will Be Logged Out Automatically After 10 Seconds
            <div
                className="card"
                style={{
                    width: 300,
                    margin: 'auto',
                    'margin-top': 20,
                    background: 'green'
                }}
            >
                <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black' }}>
                        STATUS : {transactionData?.Message}
                    </h5>
                    <h6
                        className="card-subtitle mb-2 text-muted"
                        style={{ color: 'black' }}
                    >
                        ApprovalCode : {transactionData?.ApprovalCode}
                    </h6>
                    DATE :{' '}
                    <p style={{ color: 'black' }} className="card-text">
                        {transactionData?.Date}
                    </p>
                </div>
            </div>
        </>
    );
};

export default TransactionDetails;
