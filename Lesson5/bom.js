const list = document.querySelector(".list")
const input = document.querySelector("#favchap")
const button = document.querySelector("#button")
function removeli(removeThis) {
    removeThis.remove()
}
document.querySelector("#submit").addEventListener("click", () => {
    if (!(input.value === "")) {
        const scripture = input.value;
        let li =  document.createElement("li");
        let bttn =  document.createElement("button");
        li.innerHTML = scripture;
        bttn.innerHTML = "❌";
        li.append(bttn);
        list.appendChild(li);
        bttn.addEventListener("click", () => {
            list.removeChild(li);
        });
        input.focus();
        input.value = "";
    }
});
