// Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', function () {
//     // Get the chart canvas element
//     const ctx = document.getElementById('statusChart').getContext('2d');

//     // Create the chart
//     const statusChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Applied', 'Interviewing', 'Rejected', 'Offered'],
//             datasets: [{
//                 label: 'Job Applications by Status',
//                 data: [
//                     parseInt(document.currentScript.getAttribute('data-applied')),
//                     parseInt(document.currentScript.getAttribute('data-interviewing')),
//                     parseInt(document.currentScript.getAttribute('data-rejected')),
//                     parseInt(document.currentScript.getAttribute('data-offered'))
//                 ],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// });

const dialog = document.getElementById("addjob")
const wrapper = document.querySelector(".wrapper")



function showAddJob() {
    // Clear the form fields
    document.getElementById('company_name').value = '';
    document.getElementById('job_title').value = '';
    document.getElementById('application_date').value = '';
    document.getElementById('status').value = 'Applied';
    document.getElementById('link').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('referral').value = '';

    // Update the form action for adding a new job
    const form = document.querySelector('#addjob form');


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
            form.action = `/edit/${jobId}`;

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