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
    #check that user is created
    def test_create_user(self): 
        newUser = User.objects.get(username="NewUser1")
        self.assertEqual(newUser.email, "userEmail@cool.com")
    #check that bag is created
    def test_create_bag(self):
        bag = Bag.objects.get(title="new Bag 1")
        self.assertEqual(bag.title, "new Bag 1")
    
    #test if bag is deleted
    def test_bag_deleted(self):
        newUser = User.objects.get(username = "NewUser1")
        bag = Bag.objects.get(title="new Bag 1")
        bagList = Bag.objects.filter(author=newUser)
        bag.delete()
        self.assertNotIn(bag, bagList)
    #make sure password is not returned when info requested (since password is encrypted)
    def test_return_password(self):
        newUser = User.objects.get(username = "NewUser1")
        self.assertNotEqual(newUser.password, "ok")
        
    

