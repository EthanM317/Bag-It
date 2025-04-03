from django.test import TestCase
from django.contrib.auth.models import User
from accounts.models import *

class UserTestCase(TestCase):
    def setUp(self):
        # Create dummy user
        User.objects.create_user("NewUser1", "userEmail@cool.com", "ok")
        # Create dummy bag
        # BagManager.create(BagManager, "new Bag 1", "cool bag", 1)
        BagManager.model = Bag
        BagManager.create(BagManager, "new Bag 1", "cool bag", User.objects.get(username="NewUser1"))

        bag = Bag.objects.get(title="new Bag 1")

        BagItemManager.model = BagItem
        BagItemManager.createItem(BagItemManager, bag)

        


    def test_create_user(self): 
        newUser = User.objects.get(username="NewUser1")
        self.assertEqual(newUser.email, "userEmail@cool.com")
    
    def test_create_bag(self):
        bag = Bag.objects.get(title="new Bag 1")
        self.assertEqual(bag.title, "new Bag 1")
    

    def test_delete_item(self):
        bagItem = BagItem.objects.get(bagParent=1)
        self.assertEqual(bagItem.bagParent, 1)