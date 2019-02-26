from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status,views
from users.serializers import UserSerializer, GroupSerializer, UserLoginSerailizer,UserSignupSerailizer
from rest_framework.response import Response



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class UserLoginApiView(views.APIView):
    def post(self,request,*args,**kwargs):
        serializer=UserLoginSerailizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token=serializer.save()
        data={
            'status':'ok',
            'token':token
        }
        print(data)
        return Response(data,status=status.HTTP_201_CREATED)
class UserSignupApiView(views.APIView):
    def post(self,request):
        serializer=UserSignupSerailizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token=serializer.save()
        data={
            'status':'ok',
            'token':"1"
        }
        return Response(data,status=status.HTTP_201_CREATED)
