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
