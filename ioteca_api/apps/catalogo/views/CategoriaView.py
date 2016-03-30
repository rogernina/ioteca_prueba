from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ..models.Categoria import Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        # fields = ('url', 'username', 'email', 'is_staff')


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        queryall = (Q(codigo__icontains=query),
                    Q(nombre__icontains=query))
        queryset = self.queryset.filter(reduce(OR, queryall))
        return queryset
