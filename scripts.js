const coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
}

const tools = [
    { name: "Trends.Earth", scale: ["Global"], phase: "Visioning and target setting", group: "Indicator-assessment tool", type: "Browser-based tool" },
    { name: "QGIS", scale: ["National", "Regional"], phase: "Planning", group: "Optimization tool", type: "GIS-plugin" },
    { name: "WOCAT Apps", scale: ["Local"], phase: "Monitoring and Evaluation", group: "Rapid-appraisal tool", type: "Standalone tool" },
    { name: "SEPAL", scale: ["Global"], phase: "Implementation", group: "Forward-looking tool", type: "Browser-based tool" },
    { name: "Kobo Toolbox", scale: ["Local"], phase: "Planning", group: "Multi-criteria analysis tool", type: "Standalone tool" }
];

// Dynamically filter tools based on user selections
function filterTools() {
    const selectedScales = Array.from(document.querySelectorAll("input[name='scale']:checked")).map(cb => cb.value);
    const selectedPhases = Array.from(document.querySelector("select[name='ilup-phase']").selectedOptions).map(option => option.value);
    const selectedGroups = Array.from(document.querySelector("select[name='tool-group']").selectedOptions).map(option => option.value);
    const selectedTypes = Array.from(document.querySelector("select[name='tool-type']").selectedOptions).map(option => option.value);

    const filteredTools = tools.filter(tool =>
        (selectedScales.length === 0 || selectedScales.some(scale => tool.scale.includes(scale))) &&
        (selectedPhases.length === 0 || selectedPhases.includes(tool.phase)) &&
        (selectedGroups.length === 0 || selectedGroups.includes(tool.group)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(tool.type))
    );

    displayTools(filteredTools);
}

// Render tools dynamically to the page
function displayTools(tools) {
    const toolsList = document.getElementById("tools-list");
    toolsList.innerHTML = "";

    tools.forEach(tool => {
        const toolCard = `
            <div class="tool-item">
                <h3>${tool.name}</h3>
                <p>Scale: ${tool.scale.join(", ")}</p>
                <p>Phase: ${tool.phase}</p>
                <p>Group: ${tool.group}</p>
                <p>Type: ${tool.type}</p>
            </div>
        `;
        toolsList.innerHTML += toolCard;
    });
}

// Add change event listeners to filters for dynamic updates
document.querySelectorAll("input[name='scale']").forEach(checkbox => {
    checkbox.addEventListener("change", filterTools);
});
document.querySelector("select[name='ilup-phase']").addEventListener("change", filterTools);
document.querySelector("select[name='tool-group']").addEventListener("change", filterTools);
document.querySelector("select[name='tool-type']").addEventListener("change", filterTools);

// Display all tools on initial load
displayTools(tools);
