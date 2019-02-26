from django.shortcuts import render
from django.db.models import Q
# Create your views here.
from boards.models import Board, Idea
from rest_framework import viewsets
from boards.serializers import BoardSerializer,IdeaSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404


class BoardsList(APIView):
    def get(self,request):
        request.data['user']=request.META.get('HTTP_TOKEN')
        boards=Board.objects.filter(Q(user_id=self.request.data['user'])|Q(is_public=True)).order_by('-created')
        serrializer=BoardSerializer(boards,many=True)
        return Response(serrializer.data)
    def get_object(self, pk):
        try:
            return Board.objects.get(pk=pk)
        except Board.DoesNotExist:
            raise Http404
    def post(self,request):
        request.data['user']=request.META.get('HTTP_TOKEN')
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoardsDetail(APIView):
    def get_object(self, pk):
        try:
            return Board.objects.get(pk=pk)
        except Board.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        board = self.get_object(pk)
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        board = self.get_object(pk)
        serializer = BoardSerializer(Board, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Board = self.get_object(pk)
        Board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class IdeasList(APIView):
    def get(self,request):
        ideas=Idea.objects.all().order_by('-created')
        serrializer=IdeaSerializer(ideas,many=True)
        return Response(serrializer.data)
    def get_object(self, pk):
        try:
            return Idea.objects.get(pk=pk)
        except Idea.DoesNotExist:
            raise Http404
    def post(self,request):
        request.data['user']=request.META.get('HTTP_TOKEN')


        board=Board.objects.get(pk=request.data['board'])
        if(request.data['user']==board.user_id):
            request.data['approved']=True
        else:
            request.data['approved']=False


        serializer = IdeaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IdeasDetail(APIView):
    def get_object(self, pk):
        try:
            return Idea.objects.get(pk=pk)
        except Idea.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        idea = self.get_object(pk)
        serializer = IdeaSerializer(idea)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        idea = self.get_object(pk)
        serializer = IdeaSerializer(Idea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Idea = self.get_object(pk)
        Idea.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)