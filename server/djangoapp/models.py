from django.db import models
from django.utils.timezone import now

class CarMake(models.Model):
    name = models.CharField(null=False, max_length=100)
    description = models.CharField(max_length=500)

    def __str__(self):
        return "Name: " + self.name


class CarModel(models.Model):
    SEDAN = "SEDAN"
    SUV = "SUV"
    WAGON = "WAGON"
    TYPES = (
        (SEDAN, 'Sedan'),
        (SUV, 'Sports Utility Vehicle'),
        (WAGON, 'Wagon'),
    )
    make = models.ForeignKey(CarMake, null=True, on_delete=models.CASCADE)
    name = models.CharField(null=False, max_length=100)
    dealer_id = models.BigIntegerField(null=False)
    type = models.CharField(
       max_length=10,
       choices=TYPES,
       default=SEDAN
    )
    year = models.IntegerField(null=False)

    def __str__(self):
        return "Name: " + self.name + ", " + \
            "Make: " + self.make.name + ", " + \
            "Type: " + self.type + ", " + \
            "Year: " + str(self.year)
