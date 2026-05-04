const checkboxes = document.querySelectorAll('.image-checkbox');
const deleteBtn = document.getElementById('deleteBtn');

checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        const anyChecked = Array.from(checkboxes).some(c => c.checked);

        if (anyChecked) {
            deleteBtn.disabled = false;
        } else {
            deleteBtn.disabled = true;
        };

    });
});