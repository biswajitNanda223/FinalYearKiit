import os
import csv
from django.core.management.base import BaseCommand
from ...models import Doctor

class Command(BaseCommand):
    help = "Load doctors from CSV into database"

    def handle(self, *args, **kwargs):
        # Get the absolute path of the CSV file
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        file_path = os.path.join(base_dir, "updated_doctor_dataset.csv")

        # Open and read the CSV file
        with open(file_path, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Doctor.objects.create(
                    name=row["Doctor Name"],
                    specialization=row["Specialization"],
                    hospital=row["Hospital"],
                    experience=row["Experience (years)"],
                    contact=row["Contact"],
                    general_specialization=row["General Specialization"],
                )
        self.stdout.write(self.style.SUCCESS("Successfully loaded doctors data!"))
