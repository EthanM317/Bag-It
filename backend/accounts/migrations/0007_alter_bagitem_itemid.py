# Generated by Django 5.1.6 on 2025-02-22 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_bagitem_itemid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bagitem',
            name='itemId',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
