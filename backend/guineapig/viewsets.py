from rest_framework import views
from django.contrib.auth.models import User
from guineapig.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login

from guineapig.models import Account

import uuid
import hashlib

# Spec: https://www.notion.so/sftps/Auth-REST-API-specification-4b4b44908032492a8a13df7f65201d8d

# Yeah so this repo follows 0 security practices.
# please don't fucking use it for real. Hire a real engineer
# to fix all this shit. We disabled CSRF n shit


def generate_security_token():
    return hashlib.sha256(str(uuid.uuid4()).encode()).hexdigest()


class LoginView(views.APIView):
    def post(self, request):
        # Get current user information w/ 0 fucking security

        # Don't know how to get login information from user serializer w/o breaking it

        if "username" in request.data and "password" in request.data:
            user = authenticate(
                username=request.data["username"], password=request.data["password"]
            )
            # {"username": "titan", "password": "Norton00"}

            if user is not None:
                login(request, user)

                try:
                    user.account.security_token = generate_security_token()
                    user.account.save()
                except Exception:
                    user.account = Account.objects.create(
                        security_token=generate_security_token()
                    )
                    user.save()

                return Response(
                    {
                        **UserSerializer(user).data,
                        "security_token": user.account.security_token,
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "Unknown Login"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {"error": "Expected username and password in login form"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class RegisterView(views.APIView):
    def post(self, request):
        # Sign up w/o 0 fucking security lmao

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data["password"])
            user.save()

            security_token = generate_security_token()

            account = Account.objects.create(user=user, security_token=security_token)
            account.save()
            login(request, user)
            return Response(
                {**serializer.data, "security_token": security_token},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
