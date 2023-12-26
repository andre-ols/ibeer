import { BaseEvent, OnEvent, eventBus } from '..'

describe('OnEvent', () => {
	it('should subscribe to an event', () => {
		expect.assertions(1)

		class TestEvent extends BaseEvent {
			constructor() {
				super()
				this.setName('test')
			}
		}

		const event = new TestEvent()

		class TestHandler {
			@OnEvent(TestEvent)
			handle(event: TestEvent) {
				console.log('event', event)
				expect(event).toBeInstanceOf(TestEvent)
			}
		}

		new TestHandler()

		eventBus.publish(event)
	})
})
