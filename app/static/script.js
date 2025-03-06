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
    form.action = "{{ url_for('main.add_or_edit_job') }}";

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

            // Update the form action to include the job ID
            const form = document.querySelector('#addjob form');
            form.action = `/edit/${jobId}`;

            // Open the dialog
            document.getElementById('addjob').showModal();
        })
        .catch(error => console.error('Error fetching job data:', error));
}

