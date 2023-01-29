from django.urls import path, include

from guineapig import viewsets

urlpatterns = [
    # views
    path("login/", viewsets.LoginView.as_view()),
    path("register/", viewsets.RegisterView.as_view()),
] + [path("api-auth/", include("rest_framework.urls"))]
