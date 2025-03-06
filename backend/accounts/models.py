from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

from clothing.models import ClothingItem


# -- Bags --
class BagManager(models.Manager):
    def create(self, title: str, description: str, author: User):
        # Validate fields
        if not title:
            raise ValueError("Bags must have a title")
        if not description:
            raise ValueError("Bags must have a description")
        if not author:
            raise ValueError("Bags must have a author")

        # Create the bag
        bag = self.model(
            title = title,
            description = description,
            author = author,
        )

        bag.save()
        return bag


class Bag(models.Model):
    # Fields
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Reference to the user that created the bag
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bags")

    # One to many relationship
    # "related_name" is the field name on the user that references all their bags
    # ex. user.bags

    # Set manager
    objects = BagManager()

    def __str__(self):
        return self.title


class BagItemManager(models.Manager):
    def createItem(self, bagParent: Bag):
        if not bagParent:
            raise ValueError("Bag items must have a parent")
        
        item = self.model(
            bagParent = bagParent
        )
        item.save()
        return item


class BagItem(models.Model):
    # -- Fields --
    # The bag that this item belongs to
    bagParent = models.ForeignKey(Bag, on_delete=models.CASCADE, related_name="items")
    # Clothing reference
    clothingItem = models.ForeignKey(ClothingItem, on_delete=models.CASCADE, related_name="+", null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Set manager
    objects = BagItemManager()