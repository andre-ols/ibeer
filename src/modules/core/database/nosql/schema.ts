import mongoose, { Schema } from 'mongoose'

const beerSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	abv: {
		type: Number,
		required: true,
	},
	ibu: {
		type: Number,
		required: true,
	},
	ebc: {
		type: Number,
		required: true,
	},
	category: {
		type: {
			id: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			createdAt: {
				type: Date,
				required: true,
			},
			updatedAt: {
				type: Date,
				required: true,
			},
		},
		required: true,
	},
	foodPairing: {
		type: [String],
		required: true,
	},
	brewersTips: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
})

export const BeerModel = mongoose.model('Beer', beerSchema)
