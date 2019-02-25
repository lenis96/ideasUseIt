from django.shortcuts import render
from django.db.models import Q
# Create your views here.
from boards.models import Board, Idea
from rest_framework import viewsets
from boards.serializers import BoardSerializer,IdeaSerializer


class BoardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    model=Board
    serializer_class = BoardSerializer
    queryset=Board.objects.all().order_by('created')
    def get_queryset(self):
        print(self.request.user)
        return Board.objects.filter(Q(user_id=self.request.user.id)|Q(is_public=True)).order_by('-created')
    def create(self, request, *args, **kwargs):
        print(self.request.user)
        request.POST['user']=1
        return super().create(request, *args, **kwargs)
class IdeaViewSet(viewsets.ModelViewSet):
    queryset=Idea.objects.all().order_by('created')
    serializer_class=IdeaSerializer


