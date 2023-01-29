from django.urls import path, include

from guineapig import viewsets

urlpatterns = [
    path('bottalk/', views.BotView.as_view()),
    path("login/", viewsets.LoginView.as_view()),
    path("register/", viewsets.RegisterView.as_view()),
] + [path("api-auth/", include("rest_framework.urls"))]
