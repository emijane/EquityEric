from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=10)
    plan_type = models.CharField(max_length=3)
    birthday = models.DateTimeField()
    num_of_kids = models.IntegerField(default=0)
    insurance_company = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
