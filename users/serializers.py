from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth import authenticate


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
class UserLoginSerailizer(serializers.Serializer):
    email=serializers.CharField()
    password=serializers.CharField(min_length=8,max_length=64)
    
    def validate(self,data):
        user=authenticate(username=data['email'],password=data['password'])
        if(not user):
            # print('lel')
            raise serializers.ValidationError('Invalid Credentials')
        return data
    def create(self,data):
        # print(data)
        return "1"#TODO crear jwtdata['email']+'+218TOK'


class UserSignupSerailizer(serializers.Serializer):
    firstName=serializers.CharField()
    lastName=serializers.CharField()
    username=serializers.CharField()
    email=serializers.CharField()
    password=serializers.CharField(min_length=8,max_length=64)
    passwordConfirmation=serializers.CharField(min_length=8,max_length=64)
    
    def validate(self,data):
        # TODO verificar que no exista usuario o correo

        if(data['password']!=data['passwordConfirmation']):
            raise serializers.ValidationError('Password confirmation dont match with password')
        user=authenticate(username=data['email'],password=data['password'])
        # if(not user):
        #     # print('lel')
        #     raise serializers.ValidationError('Invalid Credentials')
        return data
    def create(self,data):
        return "1"