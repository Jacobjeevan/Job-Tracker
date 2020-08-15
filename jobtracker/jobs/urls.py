from rest_framework import routers
from .api import JobViewSet, LocationViewSet
from django.urls import re_path, include

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet, 'jobs')
router.register(r'locations', LocationViewSet, 'locations')

urlpatterns = [
    re_path(r'^', include(router.urls)),
    re_path(r'^api-auth/', include('rest_framework.urls'))
]
