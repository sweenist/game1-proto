interface Subscription {
  id: number,
  eventName: string,
  caller: string,
  callback: { (value: object | null): void }
}

class Events {
  nextId: number = 0;
  subscriptions: Subscription[] = [];

  on(eventName: string, caller: string, callback: { (value: object | null): void }) {
    this.nextId += 1;
    this.subscriptions.push({
      id: this.nextId,
      eventName,
      caller,
      callback
    });

    return this.nextId;
  }

  off(id: number) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
  }

  emit(eventName: string, value: object | null) {
    const subscription = this.subscriptions.find((sub) => sub.eventName === eventName);
    return subscription?.callback(value);
  }

  unsubscribe(caller: string) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.caller !== caller);
  }
}

export const gameEvents = new Events();