# Generated by Django 5.1.6 on 2025-02-22 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_remove_bagitem_itemid_bagitem_clothingitem'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
