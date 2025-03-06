# Generated by Django 5.1.6 on 2025-03-06 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clothing', '0005_alter_clothingitem_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clothingitem',
            name='color',
            field=models.TextField(choices=[('white', 'White'), ('black', 'Black'), ('gray', 'Gray'), ('blue', 'Blue'), ('red', 'Red'), ('green', 'Green'), ('pink', 'Pink')], default='white'),
        ),
        migrations.AlterField(
            model_name='clothingitem',
            name='type',
            field=models.IntegerField(choices=[(0, 'Shorts'), (1, 'Pants'), (2, 'T Shirt'), (3, 'Dress'), (4, 'Shoes'), (5, 'Hat'), (6, 'Hoodie'), (7, 'Shirt')]),
        ),
    ]
