import { Queue } from "./queue";

var queue = new Queue<number>();

for (let i = 0; i < 20; i++) {
	queue.enqueue(i);
}
console.log(queue.toString());

for (let i = 20; i < 500; i++) {
	queue.enqueue(i);
	console.log(queue.toString());
	queue.dequeue();
}

while (!queue.isEmpty()) {
	console.log(`out: ${queue.dequeue()}`);
	console.log(queue.toString());
}