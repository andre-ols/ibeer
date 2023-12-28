import { config } from 'dotenv'

config()

export const env = {
	MONGO_URL: process.env.MONGO_URL!,
	PRISMA_URL: process.env.PRISMA_URL!,
}
