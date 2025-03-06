from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
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

    status_counts = {
        'Applied': len([job for job in jobs if job.status == 'Applied']),
        'Interviewing': len([job for job in jobs if job.status == 'Interviewing']),
        'Rejected': len([job for job in jobs if job.status == 'Rejected']),
        'Offered': len([job for job in jobs if job.status == 'Offered'])
    }

    return render_template('home.html', jobs=jobs, total_applications=len(jobs), status_counts=status_counts)


@bp.route('/add', methods=['GET', 'POST'])
@bp.route('/edit/<int:id>', methods=['GET', 'POST'])
def add_or_edit_job(id=None):
    if id:
        job = JobApplication.query.get_or_404(id)
    else:
        job = None  # New job application

    if request.method == 'POST':
        # Get form data
        company_name = request.form['company_name']
        job_title = request.form['job_title']
        application_date = datetime.strptime(request.form['application_date'], '%Y-%m-%d').date()
        status = request.form['status']
        notes = request.form['notes']
        link = request.form['link']
        referral = request.form['referral']

        # If editing an existing job application
        if job:
            job.edit_job(company_name, job_title, application_date, status, notes, link, referral)
            flash('Job application updated successfully!', 'success')
        else:
            # If adding a new job application
            JobApplication.add_job(company_name, job_title, application_date, status, notes, link, referral)
            flash('Job application added successfully!', 'success')

        return redirect(url_for('main.home'))

    return render_template('home.html', job=job)  # Pass the job if editing


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


@bp.route('/api/jobs/<int:id>', methods=['GET'])
def get_job(id):
    job = JobApplication.query.get_or_404(id)
    return jsonify({
        'company_name': job.company_name,
        'job_title': job.job_title,
        'application_date': job.application_date.isoformat(),
        'status': job.status,
        'link': job.link,
        'notes': job.notes,
        'referral': job.referral
    })