import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
	'sk_test_51PB4NVRp5rQQ2Ex4XETbULPXJstxO9Nf5mrSqxVMTnuvGle5mC4RDXHXRWjQqfOnVrtuWeS80xRp7dTP8Z7u0HYK00V3FVVIow'
)

export async function POST(request) {
	const body = await request.json()

	const session = await stripe.checkout.sessions.create({
		success_url: 'http://localhost:3000/success',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: body.name,
						images: [body.image]
					},
					unit_amount: body.price
				},
				quantity: 1
			}
		],
		mode: 'payment'
	})
	return NextResponse.json(session)
}
