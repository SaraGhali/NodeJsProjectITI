import Stripe from "stripe";
import { orderModel } from "../../DataBase/Models/order.model";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {

    let order = await orderModel.findById(req.params.orderId);

    if (!order) {
        return res.status(404).json({
            message: "order not found"
        });
    }

    const paymentIntent = await stripe.paymentIntents.create({

        amount: Math.round(order.totalPrice * 100),

        currency: "usd",

        automatic_payment_methods: { enabled: true }

    });

    
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    res.status(200).json({
        message: "payment intent created",
        clientSecret: paymentIntent.client_secret
    });
};



export const createPaymentWithSavedCard = async (req, res) => {

    let order = await orderModel.findById(req.params.orderId);

    if (!order) {
        return res.status(404).json({
            message: "order not found"
        });
    }

    const { customerEmail, paymentMethodId } = req.body;

    let customers = await stripe.customers.list({ email: customerEmail });

    let customer = customers.data[0];

    if (!customer) {
        customer = await stripe.customers.create({
            email: customerEmail
        });
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id
    });

    await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId }
    });

    const paymentIntent = await stripe.paymentIntents.create({

        amount: Math.round(order.totalPrice * 100),

        currency: "usd",

        customer: customer.id,

        payment_method: paymentMethodId,

        confirm: true

    });

    
    order.status = "paid";
    await order.save();


    res.status(200).json({
        message: "payment successful",
        paymentIntent
    });
};