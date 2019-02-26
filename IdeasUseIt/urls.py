"""IdeasUseIt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


from rest_framework import routers
from users import views as viewsUser

from boards import views as viewsBoards

router = routers.DefaultRouter()
# router.register(r'users', viewsUser.UserViewSet)
# router.register(r'boards',viewsBoards.BoardViewSet)
# router.register(r'ideas',viewsBoards.IdeaViewSet)
# router.register(r'signup',viewsUser.UserSignupApiView)

urlpatterns = [
    # path('api/', include(router.urls)),
    path('api/login',viewsUser.UserLoginApiView.as_view()),
    # path('api/signup',viewsUser.),
    path('api/boards/',viewsBoards.BoardsList.as_view()), 
    path('api/boards/<int:pk>',viewsBoards.BoardsDetail.as_view()),
    # path('api/idea'), crear
    # path('api/idea/<int:id>'), actualizar
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
