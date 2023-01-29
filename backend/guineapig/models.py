from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    security_token = models.CharField(max_length=256, null=True)
    state = models.CharField(max_length=2, null=True)
    zipcode = models.CharField(max_length=10, null=True)
    plan_type = models.CharField(max_length=3, null=True)
    birthday = models.DateTimeField(null=True)
    num_of_kids = models.IntegerField(default=0, null=True)
    insurance_company = models.CharField(max_length=100, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation_id = models.IntegerField()
    user_utterance = models.CharField(max_length=1000)
    bert_response = models.CharField(max_length=1000)
