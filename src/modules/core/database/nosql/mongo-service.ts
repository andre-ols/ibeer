import mongoose, { Collection } from 'mongoose'

export class MongoService {
	client: mongoose.Mongoose

	async connect(uri: string): Promise<void> {
		this.client = await mongoose.connect(uri, {})
	}

	async disconnect(): Promise<void> {
		await this.client.disconnect()
	}

	async isConnected() {
		const state = this.client.connection.readyState
		return state === 1
	}

	getCollection(name: string): Collection {
		return this.client.connection.collection(name)
	}

	dropCollection(name: string): Promise<void> {
		return this.client.connection.dropCollection(name)
	}
}

export const mongoService = new MongoService()
