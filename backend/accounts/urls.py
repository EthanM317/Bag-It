from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Create a new user
    path("signup/", views.CreateUser.as_view(), name="signup"),
    # Get all users or a specific user
    path("users/", views.GetUsers.as_view(), name="get_users"),
    # Get the currently signed-in user
    path("users/current/", views.GetAuthenticatedUser.as_view(), name="get_authenticated_user"),

    # Get/refresh token
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    # Bags
    path("bag/", views.BagListGet.as_view(), name="bag_list"),
    path("bag/create/", views.BagListCreate.as_view(), name="bag_list_create"),
    path("bag/delete/<int:pk>", views.BagDelete.as_view(), name="bag_delete"),

    # Bag items
    path("bag/item/create/", views.BagItemListCreate.as_view(), name="bag_item_create"),
    path("bag/item/", views.BagItemListGet.as_view(), name="bag_item_list"),
    path("bag/item/delete/<int:pk>", views.BagItemDelete.as_view(), name="bag_item_delete"),
]