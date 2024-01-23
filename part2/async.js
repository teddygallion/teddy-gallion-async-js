/*
Async Pt 2. Promises

With a promise based API, the async function 
starts the operation and returns a Promise object.
You can then attach handlers to this promise 
object and these handlers will be executed when the
operation has succeeded or failed.


*/

const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request…");


/*
In this example, we're calling the fetch() api, and assigning the 
return value to the fetchPromise variable.

Immediately after, we're logging the fetchPromise variable. This outputs 
something like Promise { <state>: "pending" }, telling us that we have a promise
object, whose status is pending, meaning the fetch operation is still going on.

Then, we pass a handler function to the Promises .then() method.
when/if our operation succeeds, the promise will call our handler passing the response object,
which contains the servers response.

We can also chain promises. 

*/

const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});



/*
	In this exampe, we call response.json() in our handler, and then 
	we add a new .then() handler into the promise returned by response.json();

	This logs the name of the first product listen in "products.json"

	A key feature of the promise API is that .then() returns a promise itself,
	 which is then completed with the result of the function passed to it. meaning it can be rewritten as such:
*/

const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });


/*
	Instead of calling the second then() inside the handler for the first then(),
	we can return the promise returned by json(), and call the second then() 
	on that return value. This is called promise chaining and means we 
	can avoid ever-increasing levels of indentation when we need to 
	make consecutive asynchronous function calls.
*/



/*
	Another important feature of Promises is error-handling. while the 
	example below works, Promises have a built in method for handling errors.
*/

 const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });


  /*
	the Catch() method allows us handle when our fetch() method
	 or any of our .then() methods fail gracefully. 
  */

  const fetchPromise = fetch(
  "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });



  /*
	It is also possible to declare multiple promises and call them all together. 
	This can be accomplished with promise.all().


	The promise returned by Promise.all() is fulfilled when and if all 
	the promises in the array are fulfilled. In this case, the then()
	handler is called with an array of all the responses, in the same order that 
	the promises were passed into all(), and rejected when and if any of the 
	promises in the array are rejected. In this case, the catch() handler is 
	called with the error thrown by the promise that rejected.

  */

const fetchPromise1 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`);
  });

  /*
	In some cases you need any one of a set of promises to be fulfilled and dont
	care which one. In which case you want promise.any(). This is fulfilled if any of the
	promises are fulfilled, or rejected if all of them fail.
  */

 /*
	 The async keyword gives you a simpler way to work with 
	 asynchronous promise-based code. Adding async at the start of 
	 a function makes it an async function:
 
*/
async function myFunction() {
  // This is an async function
}

/*
Inside an async function, you can use the await keyword before a call to a 
function that returns a promise. This makes the code wait at that point 
until the promise is settled, at which point the fulfilled value of the 
promise is treated as a return value, or the rejected value is thrown.

This enables you to write code that uses asynchronous functions but looks 
like synchronous code. For example, we could use it to rewrite 
our fetch example:

*/

async function fetchProducts() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the parsed JSON object or throw an error
    const data = await response.json();
    console.log(data[0].name);
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

fetchProducts();


/*
	Here, we are calling await fetch(), and instead of getting a Promise, 
	our caller gets back a fully complete Response object, just as if fetch()
	 were a synchronous function!

	We can even use a try...catch block for error handling, exactly as we 
	would if the code were synchronous.

	Note though that async functions always return a promise, so you can't 
	do something like:
*/


async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const promise = fetchProducts();
console.log(promise[0].name); // "promise" is a Promise object, so this will not work
/*
	Instead, you'd need to do something like:
*/


async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));



/*
Also, note that you can only use await inside an async function, 
unless your code is in a JavaScript module. That means you can't do 
this in a normal script:


*/

try {
  // using await outside an async function is only allowed in a module
  const response = await fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  console.log(data[0].name);
} catch (error) {
  console.error(`Could not get products: ${error}`);
}



/*
Promises are the foundation of asynchronous programming in modern JavaScript.
 They make it easier to express and reason about sequences of asynchronous 
 operations without deeply nested callbacks, and they support a style of error 
handling that is similar to the synchronous try...catch statement.
*/



















