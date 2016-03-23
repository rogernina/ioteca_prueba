from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ..models.Autor import Autor
from ..serializers.Autor import AutorSerializer

from ..utils import MiSetPagination



class AutorViewSet(viewsets.ModelViewSet):
    serializer_class = AutorSerializer
    pagination_class = MiSetPagination

    def get_queryset(self):
        queryset=Autor.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        if query is not None:
            queryall = (Q(nombre__icontains=query),Q(direccion__icontains=query))
            queryset = self.get_queryset().filter(reduce(OR, queryall))
            results = self.paginate_queryset(queryset)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)
        else:
            data = self.get_queryset()
            results = self.paginate_queryset(data)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)

