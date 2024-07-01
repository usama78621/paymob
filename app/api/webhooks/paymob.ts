// pages/api/webhooks/paymob.ts
import { NextApiRequest, NextApiResponse } from "next";

import { updateOrderToPaid } from "@/lib/actions/order.actions";
// import { updateOrderToPaid } from "@/actions/order.actions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { obj, type } = req.body;
        console.log(req.body)
        if (type !== "TRANSACTION") {
            return res.status(400).json({ message: "Invalid event type" });
        }

        const { order_id, success, } = obj;
        const orderId = order_id.toString();

        if (!success) {
            return res.status(400).json({ message: "Payment not successful" });
        }



        await updateOrderToPaid({
            orderId,
            paymentResult: {
                id: 'orderId',
                status: "PAID",
                email_address: "usama",
                pricePaid: "9e845843"
            },
        });

        return res.status(200).json({ message: "Payment successful" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default handler;
