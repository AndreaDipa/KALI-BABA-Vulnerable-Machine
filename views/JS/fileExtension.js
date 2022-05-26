
function checkUpload() {
    let input = document.getElementById("form-check").files[0].name;
    let extension = input.split('.').pop()
    let modal = document.getElementById("mymodal")
    const formats = ["png","jpg","jpeg"];
    if (!formats.includes(extension.toLowerCase())) {
        modal.style.display = "block"
        return(false);
    }
    else {
        return(true);
    }
}
function closeModal() {
    let modal = document.getElementById("mymodal")
    modal.style.display = "none";
    
}





