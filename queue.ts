/**
 * Generic typescript queue. 
 */
export class Queue<T> {
    #head: number
    #data: T[]

    /**
     * Generates a new Queue object.
     */
    constructor() {
        this.#head = 0;
        this.#data = [];
    }

    /**
     * Enqueues the entry. Uses the array push operation.
     * @param entry enqueued entry
     */
    public enqueue(entry: T) {
        this.#data.push(entry);
    }

    /**
     * Dequeues and returns the entry, or undefined if empty. 
     * The slice operation fires log2(n) times on n entries,
     * or amortized to ~O(1) for each dequeue.
     * @returns dequeued entry
     */
    public dequeue(): T | undefined {
        var datum: T = this.peek();

        if (datum !== undefined) {
            // Dereferences the object in the array.
            this.#data[this.#head++] = undefined;
            
            // If half the array is empty, clear it. 
            if (this.#head > this.#data.length/2) {
                this.#data.slice(this.#head);
                this.#head = 0;
            }
        }

        return datum;
    }

    /**
     * Returns the first entry of the queue. The dequeue operation without removing the object.
     * @returns first entry
     */
    public peek(): T | undefined {
        return this.#data.length > 0 ? this.#data[this.#head] : undefined;
    }

    /**
     * Returns the size of the queue.
     * @returns number of entries
     */
    public size(): number {
        return this.#data.length - this.#head;
    }

    /**
     * Returns true if the queue is empty.
     * @returns 
     */
    public isEmpty(): boolean {
        return this.size() == 0;
    }

    public toString(): string {
        return this.#data.toString();
    }
}

