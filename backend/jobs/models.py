from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class JobApplication(models.Model):

    class Status(models.TextChoices):
        APPLIED = "APPLIED", "Applied"
        SCREENING = "SCREENING", "Screening"
        INTERVIEW = "INTERVIEW", "Interview"
        OFFER = "OFFER", "Offer"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"

    STATUS_FLOW = {
        Status.APPLIED: [Status.SCREENING, Status.REJECTED],
        Status.SCREENING: [Status.INTERVIEW, Status.REJECTED],
        Status.INTERVIEW: [Status.OFFER, Status.REJECTED],
        Status.OFFER: [Status.ACCEPTED, Status.REJECTED],
        Status.ACCEPTED: [],
        Status.REJECTED: [],
    }

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    job_link = models.URLField(blank=True)
    location = models.CharField(max_length=255)
    source = models.CharField(max_length=100)
    salary = models.CharField(max_length=100, blank=True)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.APPLIED
    )

    applied_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if not self.pk:
            return  # Skip validation on creation

        previous = JobApplication.objects.get(pk=self.pk)

        if previous.status != self.status:
            allowed_transitions = self.STATUS_FLOW.get(previous.status, [])

            if self.status not in allowed_transitions:
                raise ValidationError(
                    f"Invalid status transition from {previous.status} to {self.status}"
                )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.company_name} - {self.job_title}"