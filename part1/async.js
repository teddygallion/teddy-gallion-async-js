//MDN Asynchronous tutorial part1

/*
What is Asynchronous Programming?
Technique enabling programs to start long-running tasks and remain responsive to other events.
Examples of asynchronous functions:
Making HTTP requests using fetch()
Accessing a user's camera or microphone using getUserMedia()
Asking a user to select files using showOpenFilePicker()
*/
	

	//Synchronous programming example:
const name = "Teddy";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting);
/* "Hello, my name is Teddy!"
	In the above example, a variable is declared(name),
	 and then a second variable is declared (greeting), 
	 which uses name,
	 after which greeting is printed to the console.
	the browser works through this code on a line by line basis,
	 as each line depends on the one before it, 
	 thereby making it synchronous.

*/
function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}

const name = "Miriam";
const greeting = makeGreeting(name);
console.log(greeting);
// "Hello, my name is Miriam!"
/*
the above example is still synchronous, 
because the caller has to wait for the function to finish 
before any code below it can run.
*/


/*
	What if the function takes a long time?

*/
const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const quota = document.querySelector("#quota");
const output = document.querySelector("#output");

document.querySelector("#generate").addEventListener("click", () => {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.location.reload();
});

/*
	In the above example, we use a very inefficient algorithm to 
	generate multiple large prime numbers. The higher the number of
	primes specified, the longer the operation will take. 

	The reason for this is that this JavaScript program is single-threaded. 
	A thread is a sequence of instructions that a program follows. 
	Because the program consists of a single thread, 
	it can only do one thing at a time: so if it is waiting 
	for our long-running  synchronous call to return, 
	it can't do anything else. 

*/


const log = document.querySelector(".event-log");
const text = document.querySelector("#text");
document.querySelector("#xhr").addEventListener("click", () => {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("loadend", () =>{
		log.textContent = `${log.textContent}Finished with status ${xhr.status} \n`;
	});
	xhr.open(
		"GET",
		"https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
		);
	xhr.send();
	log.textContent = `${log.textContent}Started XHR REQUEST\n`;
	console.log(xhr);
	text.innerHTML()
});
document.querySelector("#reload").addEventListener("click", ()=>{
	log.textContent = "";
	document.location.reload();
});

/*
	This example uses event listeners to await for user response 
	to send an http request.
	In the above example, We send a request using the XMLHttpRequest 
	and listen for its loadend event. the handler logs a "Finished!" message
	along with its status code.

	A callback is a function thats passed into another function,
	with the expectation that the callback will be called at the
	appropriate time.Callbacks used to be the main way async functions
	were implemented in JS. However, as we incorporate more and more
	callbacks into our code, our code becomes more difficult to read and debug.

	The solution to this in Javascript is Promises. 


*/
