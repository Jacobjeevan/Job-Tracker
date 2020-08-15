from .models import Job, Location
from .serializers import JobSerializer, LocationSerializer
from rest_framework import viewsets, permissions
import os
import requests


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def perform_create(self, serializer):
        city = serializer.validated_data['city']
        state = serializer.validated_data['state']
        location = LocationCreationUpdation(city, state).getLocation()
        serializer.save(author=self.request.user, location=location)


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]


class LocationCreationUpdation:

    def __init__(self, city, state):
        self.city = city
        self.state = state

    def getLocation(self):
        NewLocation = Location.objects.filter(city=self.city, state=self.state)
        location = list(NewLocation)
        if not location:
            NewLocation = self.createNewLocation()
        else:
            NewLocation = NewLocation.first()
        return NewLocation

    def createNewLocation(self):
        r = self.getCoordinates()
        if r.status_code == 200:
            response = r.json()
            latitude = response['data'][0]['latitude']
            longitude = response['data'][0]['longitude']
            NewLocation = Location(
                city=self.city, state=self.state, latitude=latitude, longitude=longitude)
            NewLocation.save()
            return NewLocation

    def getCoordinates(self):
        payload = {'access_key': os.environ.get(
            'MAP_API_KEY'), 'query': f"{self.city},{self.state}", 'limit': 1}
        r = requests.get(os.environ.get('MAP_URL'), params=payload)
        return r
