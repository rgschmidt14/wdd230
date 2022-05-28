list = document.querySelector(".list")
document.querySelector("#submit").addEventListener("click", () => {
    if (!(document.querySelector("#favchap").value === "")) {
        let li =  document.createElement("li");
        let bttn =  document.createElement("button");
        console.log(document.querySelector("#favchap").value)
        li.innerHTML = document.querySelector("#favchap").value;
        bttn.innerHTML = "❌";
        li.append(bttn);
        console.log(li)
        list.appendChild(li);
        
        
    }
});
