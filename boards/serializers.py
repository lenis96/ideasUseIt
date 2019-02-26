from boards.models import Board, Idea
from rest_framework import serializers
from boards.models import Board
from django.contrib.auth.models import User

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Idea
        fields=('user','board','description','approved','created','modified')
        read_only_fields=('created','modified')
    
    
class BoardSerializer(serializers.ModelSerializer):
    ideas= IdeaSerializer(many=True,read_only=True)
    class Meta:

        model = Board
        fields = ('id','user', 'title','created','modified','is_public','ideas')
        read_only_fields = ('created', 'modified')
