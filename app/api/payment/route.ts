import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { paymentId, code, total } = await req.json();
    const paymentResponse = await fetch(
        `https://api.portone.io/payments/${paymentId}`,
        {
            headers: {
                Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
            },
        }
    );
    const payment = await paymentResponse.json();
    if (code === null && paymentResponse.ok && total === payment.amount.total) {
        return NextResponse.json({ success: true }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, payment }, { status: 401 });
    }
}
