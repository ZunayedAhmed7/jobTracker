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

    def __repr__(self):
        return f"<JobApplication {self.company_name} - {self.job_title}>"