from rest_framework import serializers
from .models import Job, Location


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'employer',
                  'apply_date', 'description', 'city', 'state', 'location']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
