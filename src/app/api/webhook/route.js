const { NextResponse } = require('next/server')
import { headers } from 'next/headers'
//Conection to the stripe API
import Stripe from 'stripe'

const stripe = new Stripe(
	'sk_test_51PB4NVRp5rQQ2Ex4XETbULPXJstxO9Nf5mrSqxVMTnuvGle5mC4RDXHXRWjQqfOnVrtuWeS80xRp7dTP8Z7u0HYK00V3FVVIow'
)

export async function POST(request) {
	const res = await request.text()
	const headersList = headers(request)
	const sig = headersList.get('Stripe-Signature')

	let event

	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointScecret)
	} catch (err) {
		console.log(err)
		return NextResponse.json('Error')
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const checkoutSessionCompleted = event.data.object
			//Save in data base

			// Send email

			console.log({ checkoutSessionCompleted })
			break

		default:
			console.log(`Evento no manejado: ${event.type}`)
	}

	return new Response(null, { status: 200 })
}
