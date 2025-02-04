document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("time-blocking-table");
    
    table.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        let target = event.target;
        
        // Change background color on right-click
        if (target.tagName === "TD" || target.tagName === "DIV") {
            let newColor = prompt("Enter a color (name or hex code):", target.style.backgroundColor || "");
            if (newColor !== null) {
                target.style.backgroundColor = newColor;
            }
        }
    });
    
    table.addEventListener("mousedown", (event) => {
        if (event.button === 2) { // Right-click
            let target = event.target;
            
            // Merge cells vertically
            if (target.tagName === "TD" && target.rowSpan === 1) {
                let nextRow = target.parentElement.nextElementSibling;
                if (nextRow) {
                    let nextCell = nextRow.children[target.cellIndex];
                    if (nextCell) {
                        target.rowSpan += 1;
                        nextCell.remove();
                    }
                }
            }
        }
    });
});
