from django.db import models
from .Categoria import Categoria
from .Autor import Autor
from ..enums import LIBRO_TIPO_CHOICES, FISICO


class Libro(models.Model):
    nombre = models.CharField(max_length=50)
    categoria = models.ForeignKey(Categoria, null=True, blank=True)
    autors = models.ManyToManyField(Autor, blank=True)
    tipo = models.CharField(max_length=50, choices=LIBRO_TIPO_CHOICES, default=FISICO)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Libro"
        verbose_name_plural = "Libros"
    
    def __str__(self):
        return self.nombre
