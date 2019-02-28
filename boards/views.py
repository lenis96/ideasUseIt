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


import jwt
from django.conf import settings
from django.utils import timezone
from datetime import timedelta

def validateToken(token):
    try:
        payload=jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print(payload)
    except:
        return False # TODO mejorar
    try:
        user=User.objects.get(username=payload['user'])
    except:
        return False
    return user.id


from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self,request):
        user_id=validateToken(request.META.get('HTTP_TOKEN'))
        if(not user_id):
            return None
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')
        return (user,None)


class BoardsList(APIView):
    authentication_classes = (JWTAuthentication,)
    def get(self,request):
        if(request.GET.get('my')):
            boards=Board.objects.filter(Q(user_id=request.user.id)).order_by('-created')
        else:
            if(request.GET.get('search')):
                boards=Board.objects.filter(Q(user_id=request.user.id,title__icontains=request.GET.get('search'))|Q(is_public=True,title__icontains=request.GET.get('search'))).order_by('-created')
            else:
                boards=Board.objects.filter(Q(user_id=request.user.id)|Q(is_public=True)).order_by('-created')
        serrializer=BoardSerializer(boards,many=True)
        return Response(serrializer.data)
    def get_object(self, pk):
        try:
            board=Board.objects.get(pk=pk)
            if(board.user_id==request.user.id or board.is_public):
                return board
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        except Board.DoesNotExist:
            raise Http404

    def post(self,request):
        request.data['user']=request.user.id
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoardsDetail(APIView):
    authentication_classes = (JWTAuthentication,)
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
        request.data['user']=request.user.id
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
    authentication_classes = (JWTAuthentication,)
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
        # request.data['user']=request.META.get('HTTP_TOKEN')


        board=Board.objects.get(pk=request.data['board'])
        if(request.user.id==board.user_id):
            request.data['approved']=True
        else:
            if(board.is_public):
                request.data['approved']=False
            else:
                return Response({'message':'you cant create an idea in private board that you not are a owner'},status=status.HTTP_403_FORBIDDEN)

        request.data['user']=request.user.id
        serializer = IdeaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IdeasDetail(APIView):
    authentication_classes = (JWTAuthentication,)
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
        if(not request.data.get('description')):
            request.data['description']=idea.description
        request.data['user']=idea.user_id
        serializer = IdeaSerializer(idea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        idea = self.get_object(pk)
        if(request.user.id==idea.user_id or (request.user.id==idea.board.user_id)): #TODO agregar que si es el tablero
            idea.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)