# Generated by Django 5.0.4 on 2024-04-27 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('photo', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField()),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'products',
                'managed': False,
            },
        ),
    ]