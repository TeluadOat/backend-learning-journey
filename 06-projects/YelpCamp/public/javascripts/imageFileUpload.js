const inputElement = document.getElementById('images');
const previewContainer = document.getElementById('imagePreview');

let selectedFiles = [];

inputElement.addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
    renderPreview();
});

function renderPreview() {
    previewContainer.innerHTML = "";

    selectedFiles.forEach((file, index) => {
        const div = document.createElement('div');
        div.classList.add('mb-2');

        div.innerHTML = `
        <span>${file.name}</span>
        <button 
            type="button" 
            style="width: 15px; height: 15px; line-height: 15px; display: inline-flex; align-items: center; justify-content: center;" 
            class="btn btn-sm btn-danger p-0" onclick="removeFile(${index})"
        >
            &times;
        </button>
        `;

        previewContainer.appendChild(div);
    });

    updateInputFiles();
};

function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderPreview();
};

function updateInputFiles() {
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => {
        dataTransfer.items.add(file);
    });

    inputElement.files = dataTransfer.files;
}
