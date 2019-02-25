from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class Profile(models.Model):
#     """
#     Profile model that extends the base data with other information
#     """
#     user=models.OneToOneField(User,on_delete=models.CASCADE)
#     identenfication=models.TextField(max_length=30,blank=False)
#     photo=models.ImageField(upload_to='users/photos')
#     created=models.DateTimeField(auto_now_add=True)
#     modified=models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.user.username
class Board(models.Model):
    """
    board
    """
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.TextField(max_length=255,null=False,blank=False)
    is_public=models.BooleanField(default=False,null=False)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
class Idea(models.Model):
    """
    idea
    """
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    board=models.ForeignKey(Board,on_delete=models.CASCADE)
    description=models.TextField(max_length=1000,blank=False,null=False)
    approved=models.BooleanField()
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description