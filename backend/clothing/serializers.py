from rest_framework import serializers

from .models import ClothingItem

class ClothingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingItem
        fields = [
            "id",
            "name",
            "description",
            "size",
            "type",
            "color",
            "gender",
            "brand",
            "image",
        ]
