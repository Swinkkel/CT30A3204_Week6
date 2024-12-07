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
    }
})