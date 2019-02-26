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
        boards=Board.objects.filter(Q(user_id=self.request.user.id)|Q(is_public=True)).order_by('-created')
        serrializer=BoardSerializer(boards,many=True)
        return Response(serrializer.data)
    def get_object(self, pk):
        try:
            return Board.objects.get(pk=pk)
        except Board.DoesNotExist:
            raise Http404
    def post(self,request):
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