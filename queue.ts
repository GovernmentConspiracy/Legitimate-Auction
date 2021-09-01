/**
 * Queue using typescript generics.
 */
export class Queue<T> {
    #head: number
    #data: T[]

    constructor() {
        this.#head = 0;
        this.#data = [];
    }

    public enqueue(entry: T) {
        this.#data.push(entry);
    }

    public dequeue(): T | undefined {
        var datum: T = this.peek();

        if (datum !== undefined) {
            this.#data[this.#head++] = undefined;

            if (this.#head * 2 >= this.#data.length) {
                this.#data.slice(this.#head);
                this.#head = 0;
            }
        }

        return datum;
    }

    public peek(): T | undefined {
        return this.#data.length > 0 ? this.#data[this.#head] : undefined;
    }

    public size(): number {
        return this.#data.length - this.#head;
    }

    public isEmpty(): boolean {
        return this.size() == 0;
    }
}
