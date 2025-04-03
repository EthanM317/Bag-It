import pytest  # Used for all pytest-based test cases (translucent + opaque)
from django.test import TestCase  # Used for original UserTestCase class
from django.contrib.auth.models import User as DjangoUser  # Used in original UserTestCase (TestCase-based)
from django.urls import reverse  # Used for API endpoint testing in pytest test cases
from rest_framework.test import APIClient  # Used to simulate authenticated API calls
from rest_framework import status  # Used for asserting HTTP status codes
from accounts.models import User, Bag, BagItem, BagManager, BagItemManager  # Models under test

# Existing test cases using Django's TestCase
class UserTestCase(TestCase):
    def setUp(self):
        # Create dummy user
        DjangoUser.objects.create_user("NewUser1", "userEmail@cool.com", "ok")
        # Create dummy bag
        BagManager.model = Bag
        BagManager.create(BagManager, "new Bag 1", "cool bag", DjangoUser.objects.get(username="NewUser1"))

        bag = Bag.objects.get(title="new Bag 1")

        BagItemManager.model = BagItem
        BagItemManager.createItem(BagItemManager, bag)

    def test_create_user(self): 
        newUser = DjangoUser.objects.get(username="NewUser1")
        self.assertEqual(newUser.email, "userEmail@cool.com")  # Test Case: Custom - checks user creation

    def test_create_bag(self):
        bag = Bag.objects.get(title="new Bag 1")
        self.assertEqual(bag.title, "new Bag 1")  # Test Case: Custom - checks bag creation

    def test_delete_item(self):
        bagItem = BagItem.objects.get(bagParent=1)
        self.assertEqual(bagItem.bagParent, 1)  # Test Case: Custom - checks deletion linkage


# Pytest-based translucent and opaque box tests
@pytest.mark.django_db
def test_bag_created_on_post():
    """Test Case: Translucent - Assert new bag is created in DB when user creates a new bag"""
    client = APIClient()
    user = User.objects.create_user(email='test@example.com', password='pass1234')
    client.force_authenticate(user=user)

    response = client.post(reverse('create-bag'), {'name': 'Test Bag'})
    assert response.status_code == 201
    assert Bag.objects.filter(name='Test Bag', user=user).exists()

@pytest.mark.django_db
def test_user_info_does_not_include_password():
    """Test Case: Translucent - Assert user password is not returned in profile info"""
    client = APIClient()
    user = User.objects.create_user(email='secure@example.com', password='supersecret')
    client.force_authenticate(user=user)

    response = client.get(reverse('user-profile'))
    assert 'password' not in response.data

@pytest.mark.django_db
def test_bag_item_deletion():
    """Test Case: Translucent - Assert bag item is removed from DB when deleted"""
    client = APIClient()
    user = User.objects.create_user(email='delete@example.com', password='deletepass')
    bag = Bag.objects.create(user=user, name='MyBag')
    item = BagItem.objects.create(user=user, bag=bag, clothingItem='shirt')

    client.force_authenticate(user=user)
    response = client.delete(reverse('delete-item', args=[item.id]))
    assert response.status_code == 204
    assert not BagItem.objects.filter(id=item.id).exists()

@pytest.mark.django_db
def test_bag_appears_on_page():
    """Test Case: Opaque - Assert new bag visibly appears when created"""
    client = APIClient()
    user = User.objects.create_user(email='see@example.com', password='12345see')
    client.force_authenticate(user=user)
    client.post(reverse('create-bag'), {'name': 'VisualBag'})

    list_response = client.get(reverse('list-bags'))
    bag_names = [bag['name'] for bag in list_response.data]
    assert 'VisualBag' in bag_names

@pytest.mark.django_db
def test_login_logout_flow():
    """Test Case: Opaque - Assert login/logout updates current user correctly"""
    client = APIClient()
    user = User.objects.create_user(email='log@example.com', password='logpass')

    # Log in and verify success
    login = client.post(reverse('login'), {'email': 'log@example.com', 'password': 'logpass'})
    assert login.status_code == 200

    # Access profile as logged-in user
    profile = client.get(reverse('user-profile'))
    assert profile.status_code == 200
    assert profile.data['email'] == 'log@example.com'

    # Log out and verify logout success
    logout = client.post(reverse('logout'))
    assert logout.status_code == 200

    # After logout, accessing profile should fail
    profile2 = client.get(reverse('user-profile'))
    assert profile2.status_code in [401, 403]  # unauthorized