export function insertPageNotation(windowHeight, pageNumber) {
    const pageDiv = document.createElement("div");
    const textPageDiv = document.createTextNode(`Page ${pageNumber}`);
    pageDiv.appendChild(textPageDiv);
    document.getElementById("gallery").appendChild(pageDiv);
    pageDiv.classList.add("gallery__pageNotation");
    pageDiv.style.top = `${windowHeight - 45}px`;
}