from .models import Job, Location
from .serializers import JobSerializer, LocationSerializer
from rest_framework import viewsets, permissions, routers

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [
        permissions.AllowAny
    ]