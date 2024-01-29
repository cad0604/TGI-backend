/*******************************************************************************
 * Copyright (c) iamsouravganguli 2023.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { stripe } from '../../vendor/index.js';
export const WebhookStripe = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    try {
        // Ensure that stripe.webhooks.constructEvent is asynchronous
        const event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_af5eac4ac3b4a9f25599936b266e9a31306f2d63e2643d3a49f960fc2a7805e3');
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                // Define and call a function to handle the payment_intent.succeeded event
                handlePaymentIntentSucceeded(paymentIntentSucceeded);
                break;
            // Add cases for other event types as needed
            case 'payment_intent.payment_failed':
                const paymentIntentFailed = event.data.object;
                // Handle the payment_intent.payment_failed event
                handlePaymentIntentFailed(paymentIntentFailed);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        // Return a 200 response to acknowledge receipt of the event
        res.status(200).send();
    }
    catch (error) {
        console.error('Error processing Stripe webhook:', error);
        // Handle the error and send an appropriate response
        res.status(400).send(`Webhook Error: ${error}`);
    }
};
// Example functions to handle specific event types
const handlePaymentIntentSucceeded = (paymentIntent) => {
    // Implementation for handling payment_intent.succeeded event
    console.log('Payment succeeded:', paymentIntent.id);
};
const handlePaymentIntentFailed = (paymentIntent) => {
    // Implementation for handling payment_intent.payment_failed event
    console.log('Payment failed:', paymentIntent.id);
};
