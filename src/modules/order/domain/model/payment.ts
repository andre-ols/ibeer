import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { randomUUID } from 'crypto'

export class Payment {
	constructor(
		public readonly id: string,
		public readonly cardNumber: string,
		public readonly cvv: string,
		public readonly expirationDate: string,
		public readonly holderName: string,
		public readonly createdAt: CreatedAt,
		public readonly updatedAt: UpdatedAt,
	) {
		this.validate()
	}

	validate() {
		if (!this.id) {
			throw new Error('Payment id is required')
		}

		if (!this.cardNumber) {
			throw new Error('Payment cardNumber is required')
		}

		if (!this.cvv) {
			throw new Error('Payment cvv is required')
		}

		if (!this.expirationDate) {
			throw new Error('Payment expirationDate is required')
		}

		if (!this.holderName) {
			throw new Error('Payment holderName is required')
		}

		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new Error('CreatedAt should be less than updatedAt')
		}
	}
}

export class PaymentBuilder {
	private id: string
	private cardNumber: string
	private cvv: string
	private expirationDate: string
	private holderName: string
	private createdAt: CreatedAt
	private updatedAt: UpdatedAt

	constructor() {
		this.id = randomUUID()
		this.createdAt = new CreatedAt(new Date())
		this.updatedAt = new UpdatedAt(new Date())
	}

	withId(id: string) {
		this.id = id
		return this
	}

	withCardNumber(cardNumber: string) {
		this.cardNumber = cardNumber
		return this
	}

	withCvv(cvv: string) {
		this.cvv = cvv
		return this
	}

	withExpirationDate(expirationDate: string) {
		this.expirationDate = expirationDate
		return this
	}

	withHolderName(holderName: string) {
		this.holderName = holderName
		return this
	}

	withCreatedAt(createdAt: CreatedAt) {
		this.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: UpdatedAt) {
		this.updatedAt = updatedAt
		return this
	}

	build() {
		const payment = new Payment(
			this.id,
			this.cardNumber,
			this.cvv,
			this.expirationDate,
			this.holderName,
			this.createdAt,
			this.updatedAt,
		)
		return payment
	}
}
