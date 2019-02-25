from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    """
    Profile model that extends the base data with other information
    """
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    identenfication=models.TextField(max_length=30,blank=False)
    photo=models.ImageField(upload_to='users/photos')
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username