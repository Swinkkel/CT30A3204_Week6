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
    offersContainer.innerHTML = "";

    for(let i=0; i < offerData.length; i++) {
        const offerItem = document.createElement("div")
        offerItem.classList.add("offerDiv", "col", "s12", "m6", "l4")

        const div1 = document.createElement("div")
        div1.classList.add("card", "hoverable")
        offerItem.appendChild(div1)

        const div2 = document.createElement("div")
        div2.classList.add("card-image")
        div1.appendChild(div2)

        const baseUrl = window.location.origin
        const img = document.createElement("img")
        img.src = `${baseUrl}/${offerData[i].imagePath}`
        img.classList.add("responsive-img")
        div2.appendChild(img)

        const title = document.createElement("span")
        title.textContent = offerData[i].title
        title.classList.add("card-title")
        div2.appendChild(title)

        const div3 = document.createElement("div")
        div3.classList.add("card-content")

        const description = document.createElement("p")
        description.textContent = offerData[i].description
        div3.appendChild(description)

        const price = document.createElement("p")
        price.textContent = offerData[i].price
        div3.appendChild(price)

        div1.appendChild(div3)

        offersContainer.appendChild(offerItem)
    }
}

fetchOfferData()