from django.db import models
from ..managers.Autor import AutorManager

class Autor(models.Model):
    nombre = models.CharField(max_length=50)
    direccion = models.TextField(null=True, blank=True)
    fecha_nac = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = AutorManager()

    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"

    def __str__(self):
        return self.nombre
