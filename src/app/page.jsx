'use client'

import { products } from '@/services/products'

export default function App() {
	const handlePay = async (product) => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const session = await res.json()
		window.location = session.url
	}

	return (
		<div className='px-44'>
			<h1 className='text-3xl'>Products</h1>
			<div className='grid grid-cols-3 gap-10'>
				{products.map((product) => (
					<div
						className='p-4 text-center text-white rounded-md bg-slate-800'
						key={product.id}>
						<h2 className='font-bold text-'>{product.name}</h2>
						<p className='text-3xl font-bold'>{product.price}</p>
						<img src={product.image} alt={product.name} className='w-full' />
						<button
							className='w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md'
							onClick={() => handlePay(product)}>
							Pagar
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
