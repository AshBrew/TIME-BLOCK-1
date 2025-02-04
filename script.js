document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("time-blocking-table");
    let isSelecting = false;
    let selectedCells = new Set();

    table.addEventListener("mousedown", (event) => {
        if (event.button === 0) { // Left-click starts selection
            isSelecting = true;
            selectedCells.clear();
            document.querySelectorAll("td").forEach(cell => cell.style.backgroundColor = "");
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

            const unmergeOption = document.createElement("div");
            unmergeOption.innerText = "Unmerge Cells";
            unmergeOption.onclick = () => {
                selectedCells.forEach(cell => cell.rowSpan = 1);
                menu.remove();
            };
            menu.appendChild(unmergeOption);

            const colorOption = document.createElement("div");
            colorOption.innerText = "Change Color";
            colorOption.onclick = () => {
                let colorPicker = document.createElement("input");
                colorPicker.type = "color";
                let doneButton = document.createElement("button");
                doneButton.innerText = "Done";
                doneButton.onclick = () => {
                    selectedCells.forEach(cell => cell.style.backgroundColor = colorPicker.value);
                    menu.remove();
                };
                menu.appendChild(colorPicker);
                menu.appendChild(doneButton);
            };
            menu.appendChild(colorOption);

            document.body.addEventListener("click", () => menu.remove(), { once: true });
        }
    });
});
