
const dialog = document.getElementById("addjob")
const wrapper = document.querySelector(".wrapper")



function showAddJob() {
    // Clear the form fields
    document.querySelector('.formHeader h1').textContent = 'Add Application';
    document.getElementById('company_name').value = '';
    document.getElementById('job_title').value = '';
    document.getElementById('application_date').value = '';
    document.getElementById('status').value = 'Applied';
    document.getElementById('link').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('referral').value = '';

    // Update the form action for adding a new job
    const form = document.querySelector('#addjob form');

    const deleteButton = document.getElementById('delete-button');
    deleteButton.style.display = 'none';


    // Open the dialog
    document.getElementById('addjob').showModal();
}





function closeDialog(){
    dialog.close()
}
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
});

function openEditJobForm(jobId) {
    // Fetch the job data
    fetch(`/api/jobs/${jobId}`)
        .then(response => response.json())
        .then(job => {
            // Populate the form fields
            document.getElementById('company_name').value = job.company_name;
            document.getElementById('job_title').value = job.job_title;
            document.getElementById('application_date').value = job.application_date;
            document.getElementById('status').value = job.status;
            document.getElementById('link').value = job.link;
            document.getElementById('notes').value = job.notes;
            document.getElementById('referral').value = job.referral;
            // document.getElementById('response_date').value = job.response_date;

            // Update the form action to include the job ID
            const form = document.querySelector('#addjob form');
            document.querySelector('.formHeader h1').textContent = 'Edit Application';
            form.action = `/edit/${jobId}`;

            // Show the delete button since this is edit mode
             const deleteButton = document.getElementById('delete-button');
            deleteButton.style.display = 'inline-block';
                        
            // Set the current job ID as a data attribute on the delete button
            deleteButton.setAttribute('data-job-id', jobId);

            // Open the dialog
            document.getElementById('addjob').showModal();
        })
        .catch(error => console.error('Error fetching job data:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("jobTableBody");

    // Sorting logic when a header is clicked
    document.querySelectorAll("th").forEach((header, index) => {
        header.addEventListener("click", () => {
            const rows = Array.from(tableBody.querySelectorAll("tr"));
            const isDateColumn = index === 3 || index === 4; // Apply Date & Response Date
            const isStatusColumn = index === 2; // Status Column
            const isAscending = header.getAttribute("data-order") !== "asc";

            // Custom sorting order for status
            const statusOrder = { "Applied": 1, "Interviewing": 2, "Offered": 3, "Rejected": 4 };

            rows.sort((rowA, rowB) => {
                let cellA = rowA.cells[index].textContent.trim();
                let cellB = rowB.cells[index].textContent.trim();

                if (isStatusColumn) {
                    return (statusOrder[cellA] || 99) - (statusOrder[cellB] || 99);
                } else if (isDateColumn) {
                    return new Date(cellA) - new Date(cellB);
                } else {
                    return cellA.localeCompare(cellB);
                }
            });

            if (!isAscending) rows.reverse(); // Reverse order if already ascending

            // Update header attribute for sorting direction
            header.setAttribute("data-order", isAscending ? "asc" : "desc");

            // Re-append sorted rows to the table
            tableBody.innerHTML = "";
            rows.forEach(row => tableBody.appendChild(row));
        });
    });
});


function deleteJob() {
    // Get the job ID from the data attribute
    const jobId = document.getElementById('delete-button').getAttribute('data-job-id');
    
    // Confirm deletion
    if (confirm('Are you sure you want to delete this job application?')) {
        // Create a form to submit the POST request
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/delete/${jobId}`;
        document.body.appendChild(form);
        form.submit();
    }
}