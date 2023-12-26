import { BaseEvent, EventBus } from '../index'

describe('EventBus', () => {
	it('should subscribe to an event', () => {
		const eventBus = new EventBus()
		const handler = jest.fn()

		class TestEvent extends BaseEvent {
			constructor() {
				super()
				this.setName('test')
				this.setData({
					test: 'test',
				})
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
				this.setData({
					test: 'test',
				})
			}
		}

		class TestEvent2 extends BaseEvent {
			constructor() {
				super()
				this.setName('test2')
				this.setData({
					test: 'test',
				})
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
				this.setData({
					test: 'test',
				})
			}
		}

		const event = new TestEvent()

		eventBus.subscribe(TestEvent, handler)

		eventBus.subscribe(TestEvent, handler2)

		eventBus.publish(event)

		expect(handler).toHaveBeenCalledWith(event)
		expect(handler2).toHaveBeenCalledWith(event)
	})

	it('should unsubscribe from an event', () => {
		const eventBus = new EventBus()
		const handler = jest.fn()
		class TestEvent extends BaseEvent {
			constructor() {
				super()
				this.setName('test')
				this.setData({
					test: 'test',
				})
			}
		}

		const event = new TestEvent()

		eventBus.subscribe(TestEvent, handler)
		eventBus.unsubscribe(TestEvent, handler)
		eventBus.publish(event)

		expect(handler).not.toHaveBeenCalled()
	})
})
