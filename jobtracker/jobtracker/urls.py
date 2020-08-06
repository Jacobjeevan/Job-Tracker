from django.urls import path, include, re_path
from frontend import views

urlpatterns = [

    path('', include('frontend.urls')),
    path('api/', include('jobs.urls')),
    path('', include('users.urls')),
    re_path(r'^$', views.index),
    re_path(r'^(?:.*)/?$', views.index),
]
