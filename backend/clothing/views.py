from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse

from rest_framework import generics

from .serializers import ClothingSerializer
from .models import ClothingItem

import json

class GetClothing(generics.ListAPIView):
    serializer_class = ClothingSerializer
    permission_classes = []
    # queryset = ClothingItem.objects.all()

    def get_queryset(self):
        itemId = self.request.query_params.get("itemId")

        if itemId:
            return ClothingItem.objects.filter(id=itemId)
        else:
            return ClothingItem.objects.all()


class GetClothingList(generics.ListAPIView):
    serializer_class = ClothingSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        requestData = request.data

        if not requestData or "id" not in requestData:
            return HttpResponseBadRequest()
        
        ids = requestData["id"]

        # Build response
        clothingItems = ClothingItem.objects.filter(id__in=ids).values()

        # Return a dictionary where the key is the id of the item
        responseData = {}
        for item in list(clothingItems):
            responseData[item["id"]] = item

        return JsonResponse(responseData, safe=False)


# TODO: Add/delete clothing?
# We might just use the admin page for doing this.
# Easier since we don't have to build a frontend...
class CreateClothingItem(generics.CreateAPIView):
    serializer_class = ClothingSerializer
    permission_classes = []
    queryset = ClothingItem.objects.all()
