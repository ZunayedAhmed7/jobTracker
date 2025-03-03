from flask import Blueprint, render_template, redirect, url_for, flash, request
from datetime import datetime
from .models import JobApplication
from . import db

# Create a Blueprint for routes
bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    """
    Homepage: Displays all job applications.
    """
    # Fetch all job applications from the database
    jobs = JobApplication.query.all()
    return render_template('home.html', jobs=jobs)

@bp.route('/add', methods=['GET', 'POST'])
def add_job():
    """
    Add a new job application.
    """
    if request.method == 'POST':
        # Get form data
        company_name = request.form['company_name']
        job_title = request.form['job_title']
        application_date = datetime.strptime(request.form['application_date'], '%Y-%m-%d').date()
        status = request.form['status']
        notes = request.form['notes']

        # Create a new JobApplication object
        new_job = JobApplication(
            company_name=company_name,
            job_title=job_title,
            application_date=application_date,
            status=status,
            notes=notes
        )

        # Add to the database
        db.session.add(new_job)
        db.session.commit()

        # Redirect to the homepage
        flash('Job application added successfully!', 'success')
        return redirect(url_for('main.home'))

    return render_template('add_job.html')

@bp.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_job(id):
    """
    Edit an existing job application.
    """
    job = JobApplication.query.get_or_404(id)

    if request.method == 'POST':
        # Update the job application with new data
        job.company_name = request.form['company_name']
        job.job_title = request.form['job_title']
        job.application_date = datetime.strptime(request.form['application_date'], '%Y-%m-%d').date()
        job.status = request.form['status']
        job.notes = request.form['notes']

        # Commit changes to the database
        db.session.commit()

        # Redirect to the homepage
        flash('Job application updated successfully!', 'success')
        return redirect(url_for('main.home'))

    return render_template('edit_job.html', job=job)

@bp.route('/delete/<int:id>', methods=['POST'])
def delete_job(id):
    job = JobApplication.query.get_or_404(id)

    # Delete the job application
    db.session.delete(job)
    db.session.commit()

    # Redirect to the homepage
    flash('Job application deleted successfully!', 'success')
    return redirect(url_for('main.home'))

@bp.route('/stats')
def stats():
    """
    Display statistics about job applications.
    """
    # Fetch all job applications
    jobs = JobApplication.query.all()

    # Calculate statistics
    total_applications = len(jobs)
    status_counts = {
        'Applied': len([job for job in jobs if job.status == 'Applied']),
        'Interviewing': len([job for job in jobs if job.status == 'Interviewing']),
        'Rejected': len([job for job in jobs if job.status == 'Rejected']),
        'Offered': len([job for job in jobs if job.status == 'Offered'])
    }

    return render_template('stats.html', total_applications=total_applications, status_counts=status_counts)