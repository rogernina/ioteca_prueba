from django.db import models
from .Libro import Libro


class Ejemplar(models.Model):

    codigo = models.CharField(max_length=50)
    libro = models.ForeignKey(  # related_name='ejemplar_set',
        Libro)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Ejemplar"
        verbose_name_plural = "Ejemplares"

    def __str__(self):
        return '%s %s' % (self.codigo, self.libro.nombre)
