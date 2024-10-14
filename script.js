//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
const downloadImage = (image) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = image.url;
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
	})
}
btn.addEventListener("click", () => {
	output.innerHTML = "";
	const downloadPromises = images.map(downloadImage);
	Promise.allSettled(downloadPromises).then((results) => {
		results.forEach((result) => {
			if (result.status === "fulfilled") {
				output.appendChild(result.value);
			} else if (result.status("rejected")) {
				const errorMessage = document.createElement("p");
				errorMessage.textContent = result.reason.message;
				errorMessage.style.color = "red";
				output.appendChild(errorMessage);
			}
		})
	})
})