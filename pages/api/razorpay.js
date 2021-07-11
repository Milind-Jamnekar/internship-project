const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const payment_capture = 1,
    amount = req.body.amount,
    currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    // console.log(response);
    res.status(200).json({
      id: response.id,
      amount: response.amount,
      currency: response.currency,
    });
  } catch (error) {
    console.log(error);
  }
};
