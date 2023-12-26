export abstract class BaseEvent {
	// The unique name of the event.
	private name: string

	// The timestamp of when the event occurred.
	private timestamp: Date

	constructor() {
		this.timestamp = new Date()
	}

	setName(name: string) {
		this.name = name
	}

	getName() {
		return this.name
	}

	getTimestamp() {
		return this.timestamp
	}
}
