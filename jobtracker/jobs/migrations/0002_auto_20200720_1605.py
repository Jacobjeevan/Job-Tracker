# Generated by Django 3.0.8 on 2020-07-20 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='author',
        ),
        migrations.RemoveField(
            model_name='job',
            name='location',
        ),
    ]
