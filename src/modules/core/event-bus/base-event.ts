export abstract class BaseEvent {
	// The unique name of the event.
	private name: string

	// The timestamp of when the event occurred.
	private timestamp: Date

	// Optional data associated with the event (any type).
	private data?: any

	constructor() {
		this.timestamp = new Date()
	}

	setName(name: string) {
		this.name = name
	}

	setData(data: any) {
		this.data = data
	}

	getName() {
		return this.name
	}

	getTimestamp() {
		return this.timestamp
	}

	getData() {
		return this.data
	}
}
