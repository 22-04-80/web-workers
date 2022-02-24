const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

const workers = [];

if (window.Worker) {
	const myWorker = new Worker("scripts/worker.js");

	function sendComplexMessage() {
		myWorker.postMessage({type:"msg", data: {num: 1}})
	}

	function triggerErrorInWorker() {
		myWorker.postMessage({type:"err", data: {}})
	}

	function createCustomWorker(task) {
		const blob = new Blob([`onmessage=${task.toString()}`])
		return  new Worker(window.URL.createObjectURL(blob));
	}

	function spawnWorker() {
		let newWorker = createCustomWorker(function (messageEvent) {
			console.log("hello")
			let counter = 0;
			setInterval(function () {
				postMessage({type: "counter", data: {counter: counter++}})
			}, 1000);
		})
		workers.push(newWorker)
		newWorker.postMessage("hi")
		newWorker.onmessage = function(e) {
			console.log("Main thread received message", e.data)
			result.textContent = JSON.stringify(e.data);
			console.log('Message received from worker');
		}
	}

	function startCrossOriginWorker() {
		let newWorker = new Worker("https://mdn.github.io/simple-web-worker/worker.js")
		newWorker.postMessage("Hello")
	}

	function startCrossOriginWorkerWithImportScripts() {
		const content = `importScripts("https://mdn.github.io/simple-web-worker/worker.js")`;
		const workerUrl = URL.createObjectURL(new Blob([content], {type: "text/javascript"}));
		const worker = new Worker(workerUrl);
		worker.postMessage("Hello");
	}

	first.onchange = function() {
		myWorker.postMessage({type: "calc", data: [first.value, second.value]});
		console.log('Message posted to worker');
	}

	second.onchange = function() {
		myWorker.postMessage({type: "calc", data: [first.value, second.value]});
		console.log('Message posted to worker');
	}

	myWorker.onmessage = function(e) {
		console.log("Main thread received message", e.data)
		result.textContent = JSON.stringify(e.data);
		console.log('Message received from worker');
	}
} else {
	console.log('Your browser doesn\'t support web workers.');
}
