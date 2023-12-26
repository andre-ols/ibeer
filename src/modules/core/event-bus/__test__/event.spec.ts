import { BaseEvent, EventBus } from '../index'

describe('EventBus', () => {
	describe('EventBus', () => {
		it('should subscribe to an event', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)
			eventBus.publish(event)

			expect(handler).toHaveBeenCalledWith(event)
		})

		it('should subscribe to multiple events', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			class TestEvent2 extends BaseEvent {
				constructor() {
					super()
					this.setName('test2')
				}
			}

			const event = new TestEvent()
			const event2 = new TestEvent2()

			eventBus.subscribe(TestEvent, handler)
			eventBus.subscribe(TestEvent2, handler)
			eventBus.publish(event)
			eventBus.publish(event2)

			expect(handler).toHaveBeenCalledTimes(2)
		})

		it('should subscribe to one event with multiple handlers', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()
			const handler2 = jest.fn()

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)

			eventBus.subscribe(TestEvent, handler2)

			eventBus.publish(event)

			expect(handler).toHaveBeenCalledWith(event)
			expect(handler2).toHaveBeenCalledWith(event)
		})
		it('should throw an error when unsubscribing from an event that is not subscribed', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			expect(() => {
				eventBus.unsubscribe(TestEvent, handler)
			}).toThrow()
		})

		it('should throw an error when unsubscribing a handler that is not subscribed', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()
			const handler2 = jest.fn()

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)

			eventBus.publish(event)

			expect(() => {
				eventBus.unsubscribe(TestEvent, handler2)
			}).toThrow()
		})

		it('should unsubscribe from an event', () => {
			const eventBus = new EventBus()
			const handler = jest.fn()
			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)
			eventBus.unsubscribe(TestEvent, handler)
			eventBus.publish(event)

			expect(handler).not.toHaveBeenCalled()
		})
	})

	describe('BaseEvent', () => {
		it('should be return the correct event name', () => {
			const eventBus = new EventBus()
			const handler = jest.fn().mockImplementation((event) => {
				expect(event.getName()).toBe('test')
			})
			const handler2 = jest.fn().mockImplementation((event) => {
				expect(event.getName()).toBe('test')
			})

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)

			eventBus.subscribe(TestEvent, handler2)

			eventBus.publish(event)

			expect(event.getName()).toBe('test')
		})

		it('should be return the correct event timestamp', () => {
			const eventBus = new EventBus()
			const handler = jest.fn().mockImplementation((event) => {
				expect(event.getTimestamp()).toBeInstanceOf(Date)
			})
			const handler2 = jest.fn().mockImplementation((event) => {
				expect(event.getTimestamp()).toBeInstanceOf(Date)
			})

			class TestEvent extends BaseEvent {
				constructor() {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent()

			eventBus.subscribe(TestEvent, handler)

			eventBus.subscribe(TestEvent, handler2)

			eventBus.publish(event)

			expect(event.getTimestamp()).toBeInstanceOf(Date)
		})

		it('should be return the correct event data', () => {
			const eventBus = new EventBus()

			class TestEvent extends BaseEvent {
				constructor(readonly data: { id: string; price: number }) {
					super()
					this.setName('test')
				}
			}

			const event = new TestEvent({ id: '1', price: 100 })

			eventBus.subscribe(TestEvent, (event) => {
				expect(event.data).toEqual({ id: '1', price: 100 })
			})

			eventBus.publish(event)
		})
	})
})
