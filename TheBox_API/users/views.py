from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import *


# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create Token for new user
        refresh = RefreshToken.for_user(user)

        # Return a custom response
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDatailSerializer
    permission_classes = [IsAuthenticated, IsAdminUser] # Wanted adding an IsAdmin permission

    def get_object(self):
        # This returns the user associated with the JWT token
        return self.request.user