document.getElementById("offerForm").addEventListener("submit", async function(event) {
    event.preventDefault()
    const formData = new FormData(this)


    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        })
        if (!response.ok) {
            throw new Error("Upload failed")
        }
        const responseData = await response.json()
    } catch(error) {
        console.log("Error: ", error)
    } finally {
        console.log("Added successfully")
        fetchOfferData()
    }
})


const fetchOfferData = async() => {
    try {
        const response = await fetch("/offers")
        if(!response.ok) {
            throw new Error("Failed to fetch offers")
        }
        const offerData = await response.json()
        displayOffers(offerData)

    } catch(error) {
        console.error("Error", error)
    }
}

const displayOffers = (offerData) => {
    const offersContainer = document.getElementById("offersContainer")
    for(let i=0; i < offerData.length; i++) {
        const offerItem = document.createElement("div")
        offerItem.classList.add("offerDiv")

        const img = document.createElement("img")
        img.src = `http://localhost:8000/${offerData[i].path}`

        const title = document.createElement("p")
        title.textContent = offerData[i].title

        const price = document.createElement("p")
        price.textContent = offerData[i].price

        const description = document.createElement("p")
        description.textContent = offerData[i].description

        offerItem.appendChild(img)
        offerItem.appendChild(description)
        offersContainer.appendChild(imageItem)
    }
}

fetchOfferData()