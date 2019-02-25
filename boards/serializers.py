from boards.models import Board, Idea
from rest_framework import serializers
from boards.models import Board
from django.contrib.auth.models import User

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('url', 'user', 'title','created','modified','is_public')
        read_only_fields = ('created', 'modified')

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Idea
        fields=('url','user','board','description','approved','created','modified')
        read_only_fields=('created','modified')
    