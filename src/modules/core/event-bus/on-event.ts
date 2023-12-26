import { eventBus } from '.'
import { BaseEvent } from './base-event'

// create a decorator "OnEvent" is used to register a listener to an event.
export function OnEvent<T extends BaseEvent>(eventClass: { new (...args: any[]): T }) {
	return function (_: any, __: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value

		eventBus.subscribe(eventClass, (event: T) => {
			// Type assertion for method's first argument
			originalMethod.call(_, event as any)
		})
	}
}
