from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status,views
from users.serializers import UserSerializer, GroupSerializer, UserLoginSerailizer,UserSignupSerailizer
from rest_framework.response import Response
from users.models import Profile
from rest_framework.parsers import FileUploadParser



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
    # parser_classes = (FileUploadParser,)
    def post(self,request, format=None):


        print(request.FILES)
        serializer=UserSignupSerailizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.data['password'] != request.data['passwordConfirmation']:
            return Response({'message':'password dont match with password confirmation'},status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        except:
            return Response({'error': 'Username is already in user'},status=status.HTTP_400_BAD_REQUEST)

        user.first_name = request.data['firstName']
        user.last_name = request.data['lastName']
        user.email = request.data['email']
        user.save()

        profile = Profile(user=user)
        profile.identification=request.data['identificationNumber']
        profile.photo=request.FILES['photo']
        profile.save()
        token=serializer.save()
        data={
            'status':'ok',
            'token':token
        }
        return Response(data,status=status.HTTP_201_CREATED)
