const User = require("../models/user");
const braintree = require('braintree');
require("dotenv").config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data)
    }
  })
}

exports.processPayment = (req, res) => {
  let nonceFromClient = req.body.paymentMethodNonce;
  let amountFromClient = req.body.amount;

  gateway.transaction.sale({
    amount: amountFromClient,
    paymentMethodNonce: nonceFromClient,
    options: {
      submitForSettlement: true
    }
  })
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}