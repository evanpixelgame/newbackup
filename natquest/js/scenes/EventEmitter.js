// Define a custom event emitter class
export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Method to subscribe to events
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    // Method to emit events
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => {
                listener(...args);
            });
        }
    }
}
