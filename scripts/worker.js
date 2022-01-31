onmessage = function(e) {
	switch (e.data.type) {
		case "calc": {
			const result = e.data.data[0] * e.data.data[1];
			if (isNaN(result)) {
				postMessage('Please write two numbers');
			} else {
				const workerResult = 'Result: ' + result;
				console.log('Worker: Posting message back to main script');
				postMessage(workerResult);
			}
			break;
		}
		case "msg": {
			console.log("worker received complex message:", e.data.type, e.data.data)
			break;
		}
		case "err": {
			throw new Error("Triggered error")
		}
		default: {
			console.log("worker received message with data:", e.data)
		}
	}
	console.log('Worker: Message received from main script', {data: e.data});
}

onerror = function (error) {
	console.log('!!!', error)
	postMessage({type: "error", error})
}
