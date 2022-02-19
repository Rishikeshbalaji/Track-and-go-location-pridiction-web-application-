from django.db import models

# Create your models here.


class Tracker(models.Model):
        source = models.CharField(max_length=200)
        start_time = models.CharField(max_length=200)
        destination = models.CharField(max_length=200)

        def __str__(self):
            return self.source, self.start_time, self.destination
