
	//Implementing a promise-based API
/*
	The setTimeout API takes a callback function and a 
	delay in milliseconds as arguments. When called, it 
	starts a timer set to the given delay and when the timer expires 
	it calls the given function.
*/

const output = document.querySelector("#output");
const button = document.querySelector("#set-alarm");

function setAlarm() {
  setTimeout(() => {
    output.textContent = "Wake up!";
  }, 1000);
}

button.addEventListener("click", setAlarm);
/*
 In the above example, we call setTimeout() 
 to change the text content of our html element #output
 to say "wake up!" at the end of our timer. 

 our alarm function will return a Promise thats fulfilled when
 the timer expires, which will pass our message to the then()
 handler, and will reject the promise if the caller supplies
  a negative delay value.
*/

/*The key component here is the Promise() constructor. 
The Promise() constructor takes a single function 
as an argument. We'll call this function the 
executor. When you create a new promise you 
supply the implementation of the executor.

This executor function itself takes two arguments, 
which are both also functions, and which are 
conventionally called resolve and reject. 
In your executor implementation, you call the 
nderlying asynchronous function. If the 
asynchronous function succeeds, you call 
resolve, and if it fails, you call reject. 
If the executor function throws an error, 
reject is called automatically. You can 
pass a single parameter of any type into 
resolve and reject.*/
//


function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}


/*
	in this example we create and return a new promise, inside the executor for
	the promise we check that the delay specified is not negative, and throw an error
	if it is, and call setTimeout, passing a callback and a delay, the callback will be
	called when the timer expires, and in the callback we call resolve, passing in our message.


*/


const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener("click", () => {
  alarm(name.value, delay.value)
    .then((message) => (output.textContent = message))
    .catch((error) => (output.textContent = `Couldn't set alarm: ${error}`));
});
/*
	in this example, we can explicitly set the the amount of delay used in the
	setTimeout() function, and we can see what happens if we try to set a negative
	value for the Delay. 

	/
*/


/* 
Since alarm() returns a Promise, we can do everything with it that we could 
do with any other promise: promise chaining, Promise.all(), and async / await:
*/

const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener("click", async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  } catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});

