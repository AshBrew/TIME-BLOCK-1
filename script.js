document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("time-blocking-table");
    let isSelecting = false;
    let selectedCells = new Set();

    table.addEventListener("mousedown", (event) => {
        if (event.button === 0) { // Left-click to select multiple cells
            isSelecting = true;
            selectedCells.clear();
            table.querySelectorAll("td").forEach(cell => cell.style.backgroundColor = "");
        }
    });

    table.addEventListener("mousemove", (event) => {
        if (isSelecting && event.target.tagName === "TD") {
            event.target.style.backgroundColor = "lightblue";
            selectedCells.add(event.target);
        }
    });

    table.addEventListener("mouseup", () => {
        isSelecting = false;
    });

    table.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        let target = event.target;

        if (target.tagName === "TD") {
            const menu = document.createElement("div");
            menu.className = "context-menu";
            menu.style.top = `${event.clientY}px`;
            menu.style.left = `${event.clientX}px`;
            document.body.appendChild(menu);

            const colorOption = document.createElement("div");
            colorOption.innerText = "Change Color";
            colorOption.onclick = () => {
                let colorPicker = document.createElement("input");
                colorPicker.type = "color";
                colorPicker.oninput = (e) => {
                    selectedCells.forEach(cell => cell.style.backgroundColor = e.target.value);
                };
                colorPicker.onblur = () => menu.remove();
                menu.appendChild(colorPicker);
                colorPicker.click();
            };
            menu.appendChild(colorOption);

            const mergeOption = document.createElement("div");
            mergeOption.innerText = "Merge Cells";
            mergeOption.onclick = () => {
                if (selectedCells.size > 1) {
                    let firstCell = [...selectedCells][0];
                    firstCell.rowSpan = selectedCells.size;
                    selectedCells.forEach((cell, index) => {
                        if (index > 0) cell.remove();
                    });
                }
                menu.remove();
            };
            menu.appendChild(mergeOption);

            document.body.addEventListener("click", () => menu.remove(), { once: true });
        }
    });
});
