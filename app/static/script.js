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
function showAddJob(){
    dialog.showModal()
}
function closeDialog(){
    dialog.close()
}
dialog.addEventListener("click", (e) => {
    // Check if the click target is the dialog itself (not the wrapper or its children)
    if (e.target === dialog) {
        dialog.close();
    }
});
