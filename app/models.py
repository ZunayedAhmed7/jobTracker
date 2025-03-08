from . import db

class JobApplication(db.Model):
    """
    Represents a job application in the database.
    """
    __tablename__ = 'job_applications'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    application_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    link = db.Column(db.Text, nullable = True)
    referral = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f"<JobApplication {self.company_name} - {self.job_title}>"
    
    @classmethod
    def add_job(cls, company_name, job_title, application_date, status, notes=None, link=None, referral=None):
        """
        Add a new job application to the database.
        """
        new_job = cls(
            company_name=company_name,
            job_title=job_title,
            application_date=application_date,

            status=status,
            notes=notes,
            link=link,
            referral=referral
        )
        db.session.add(new_job)
        db.session.commit()
        return new_job

    def edit_job(self, company_name, job_title, application_date, status, notes=None, link=None, referral=None):
        """
        Edit an existing job application.
        """
        self.company_name = company_name
        self.job_title = job_title
        self.application_date = application_date

        self.status = status
        self.notes = notes
        self.link = link
        self.referral = referral
        db.session.commit()
        return self