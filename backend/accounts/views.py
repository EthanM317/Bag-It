from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, BagSerializer, BagItemSerializer
from .models import Bag, BagItem


class CreateUser(generics.CreateAPIView):
    # Create an account
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class GetUsers(generics.ListAPIView): 
    serializer_class = UserSerializer
    permission_classes = []

    def get_queryset(self):
        userId = self.request.query_params.get("userId")
        if userId:
            # Use parameter to return user
            return User.objects.filter(id=userId)
        else:
            # Request a dump of all registered users
            return User.objects.all()


class GetAuthenticatedUser(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        userId = self.request.user.id
        return User.objects.filter(id=userId)


# -- Bags --
class BagListCreate(generics.ListCreateAPIView):
    serializer_class = BagSerializer

    permission_classes = [IsAuthenticated]

    # Get all bags created by the user
    def get_queryset(self):
        user = self.request.user
        return Bag.objects.filter(author=user)
       
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class BagListGet(generics.ListAPIView):
    serializer_class = BagSerializer
    # NOTE: User doesn't need to be authenticated in order to see someone's bags
    permission_classes = []

    def get_queryset(self):
        # Get query param for bags
        userId = self.request.query_params.get("userId")
        bagId = self.request.query_params.get("bagId")

        if bagId:
            return Bag.objects.filter(id=bagId)

        if userId:
            return Bag.objects.filter(author=userId)
        else:
            # Get all bags
            return Bag.objects.all()


class BagDelete(generics.DestroyAPIView):
    serializer_class = BagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the user that's authenticated
        user = self.request.user
        return Bag.objects.filter(author=user)


# -- Bag items --
# Create bag item
class BagItemListCreate(generics.CreateAPIView):
    serializer_class = BagItemSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        if serializer.is_valid():
            # Thank you: https://stackoverflow.com/questions/37839867/valueerror-cannot-assign-must-be-an-instance
            bagParent = Bag.objects.get(id = self.request.data["bagParent"])
            if not bagParent:
                raise ValueError("Bag doesn't exist")
            
            serializer.save(bagParent=bagParent)
        else:
            print(serializer.error)


# Get bag items
class BagItemListGet(generics.ListAPIView):
    serializer_class = BagItemSerializer
    permission_classes = []

    def get_queryset(self):
        # Get current bag's items
        bagParent = self.request.query_params.get("bagParent")
        if bagParent:
            return BagItem.objects.filter(bagParent=bagParent)
        
        # Otherwise, just return all I guess...
        return BagItem.objects.all()


# Destroy bag items
class BagItemDelete(generics.DestroyAPIView):
    serializer_class = BagItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user

        # Make sure the user can only destroy items from a bag that they own
        bagIds = []
        for bag in Bag.objects.filter(author=user):
            bagIds.append(bag.id)

        return BagItem.objects.filter(bagParent__in=bagIds)
        # return BagItem.objects.filter(bagParent=user.bags.id)
        # return BagItem.objects.all()
