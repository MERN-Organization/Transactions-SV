const getTransactionData = async (req, res, next) => {
    try {
        const currentTime = new Date();

        res.status(201).send({
            ResponseCode: 00,
            Message: 'Success',
            ApprovalCode: '123123',
            Date: currentTime
        });
    } catch (err) {}
};

module.exports = { getTransactionData };
