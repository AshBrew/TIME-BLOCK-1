document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("time-blocking-table");

    table.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        let target = event.target;

        if (target.tagName === "TD") {
            const menu = document.createElement("div");
            menu.className = "context-menu";
            menu.style.top = `${event.clientY}px`;
            menu.style.left = `${event.clientX}px`;
            menu.innerText = "Right-click menu";
            document.body.appendChild(menu);

            document.body.addEventListener("click", () => menu.remove(), { once: true });
        }
    });
});
