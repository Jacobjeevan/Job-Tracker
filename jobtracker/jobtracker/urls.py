from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('jobs.urls')),
    path('', include('users.urls')),
]
