const stripe = require("stripe")
("sk_test_51Oh2pcSBHW6gy99XlHVYubWxsdbBA3tiqo4oHCg6xntcLMvTnwOKHJTB56Md5onuLX6kydzqfvQc94PeYTScq2lX00KWEtgFzV");

const paymentcontrol=async(req,res)=>{
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            
        });
        
        res.json({ clientSecret:paymentIntent.client_secret });
       
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
};

module.exports={
    paymentcontrol
}