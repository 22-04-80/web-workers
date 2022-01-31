const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

if (window.Worker) {
	const myWorker = new Worker("scripts/worker.js");

	function sendComplexMessage() {
		myWorker.postMessage({type:"msg", data: {num: 1}})
	}

	function triggerErrorInWorker() {
		myWorker.postMessage({type:"err", data: {}})
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
