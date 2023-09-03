searchData = () => {
    const searchTerm = document.getElementById('searchTerm').value;
    fetch(`/api/data/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


deleteRecord = () => {
    const deleteId = document.getElementById('deleteId').value;
    fetch(`/api/delete/${deleteId}`, { method: 'DELETE' })
        .then(response => {
            if (response.status === 200) {
                alert('Record deleted successfully.');
            } else {
                alert('Failed to delete record.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


updateRecord = () => {
    const updateId = document.getElementById('updateId').value;
    const newOwner = document.getElementById('newOwner').value;
    const newIsValid = document.getElementById('newIsValid').value;
    
    const data = {
        id: updateId,
        owner: newOwner,
        isValid: newIsValid
    };
    
    fetch(`/api/update/${updateId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            alert('Record updated successfully.');
        } else {
            alert('Failed to update record.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}