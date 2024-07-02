import axios from "axios";

const PAYMOB_URL = "https://pakistan.paymob.com/api";

export const paymob = {
  authenticate: async function () {
    // eslint-disable-next-line no-unused-vars
    const API_TOKEN = process.env.PAY_API;
    const url = `${PAYMOB_URL}/auth/tokens`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key:
        "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TlRFMk9UTXNJbTVoYldVaU9pSXhOamd4T1RrMU5UTTBMakV3TlRZeE5TSjkub2JiN3Z0SDc0LTBCajFoSGJLaVp2S2Y0OXdpYWN0dDU3VndRY3BSbTBlTm9ua0NaMXZpZURld2VZaDM3MzFoZHFiUkFvanlwSzF6Zjc0VEFiWHZFaXc=",
    };
    const response = await axios.post(url, data, { headers });
    return response.data.token;
  },

  createOrder2: async function (
    amount: number,
    orderItems: any,
    shippingAddress: any,
    merchant_order_id:string
  ) {
    // Ensure amount is typed as a number
    const amount_cents = amount * 100; // Convert amount to cents
    console.log(amount_cents, orderItems);
    const accessToken = await this.authenticate();
    const urlOrder = `${PAYMOB_URL}/ecommerce/orders`;
    const headers = {
      "Content-Type": "application/json",
    };
    const orderData = {
      auth_token: accessToken,
      delivery_needed: false,
      amount_cents,
      merchant_order_id: merchant_order_id,
      currency: "USD",
      items: [],
    };
    const orderResponse = await axios.post(urlOrder, orderData, { headers });

    const orderId = orderResponse.data.id;
    const urlPaymentKey = `${PAYMOB_URL}/acceptance/payment_keys`;
    const paymentData = {
      auth_token: accessToken,
      amount_cents,
      expiration: 3600,
      billing_data: {
        apartment: "null",
        email: shippingAddress.email,
        floor: "null",
        first_name: shippingAddress.fullName,
        street: "null",
        building: "null",
        phone_number: shippingAddress.phone_number
          ? shippingAddress.phone_number
          : "null",
        shipping_method: "null",
        postal_code: "null",
        city: "null",
        country: shippingAddress.country,
        last_name: shippingAddress.fullName,
        state: "null",
      },
      order_id: orderId,
      currency: "USD",
      integration_id: 53190, // Replace with your integration id
    };
    console.log(paymentData);
    const paymentResponse = await axios.post(urlPaymentKey, paymentData, {
      headers,
    });
    console.log(paymentResponse);
    const paymentToken = paymentResponse.data.token;
    const paymentLink = `https://pakistan.paymob.com/api/acceptance/iframes/76428?payment_token=${paymentToken}`;
    return { Id: orderId, paymentLink };
  },
};
