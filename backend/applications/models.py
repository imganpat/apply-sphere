from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class JobApplication(models.Model):
    class Status(models.TextChoices):
        APPLIED = "applied", "Applied"
        SCREENING = "screening", "Screening"
        INTERVIEW = "interview", "Interview"
        OFFER = "offer", "Offer"
        ACCEPTED = "accepted", "Accepted"
        REJECTED = "rejected", "Rejected"

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
        related_name="applications",
    )

    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    application_link = models.URLField(blank=True)
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=100, blank=True)
    source = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.APPLIED,
    )

    applied_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def clean(self):
        if not self.pk:
            return

        previous = JobApplication.objects.get(pk=self.pk)

        if previous.status != self.status:
            allowed = self.STATUS_FLOW.get(previous.status, [])
            if self.status not in allowed:
                raise ValidationError(
                    f"Invalid status transition from {previous.status} to {self.status}"
                )

    def save(self, *args, **kwargs):
        is_update = self.pk is not None

        if is_update:
            previous = JobApplication.objects.get(pk=self.pk)

        self.full_clean()
        super().save(*args, **kwargs)

        # Create history AFTER successful save
        if is_update and previous.status != self.status:
            StatusHistory.objects.create(
                application=self,
                old_status=previous.status,
                new_status=self.status,
            )

    def __str__(self):
        return f"{self.company} - {self.role}"  # Fixed: was company_name, job_title


class StatusHistory(models.Model):
    application = models.ForeignKey(
        JobApplication,
        on_delete=models.CASCADE,
        related_name="status_history",
    )

    old_status = models.CharField(
        max_length=20,
        choices=JobApplication.Status.choices,
    )

    new_status = models.CharField(
        max_length=20,
        choices=JobApplication.Status.choices,
    )

    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-changed_at"]

    def __str__(self):
        return f"{self.application} - {self.old_status} → {self.new_status}"


class ApplicationNote(models.Model):
    application = models.ForeignKey(
        JobApplication, on_delete=models.CASCADE, related_name="notes"
    )

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Note for {self.application} by {self.author.email}"
