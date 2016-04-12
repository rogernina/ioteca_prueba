from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ..models.Autor import Autor
from ..models.Libro import Libro
from ..serializers.Autor import AutorSerializer

from ..utils import MiSetPagination
from apps.utils.paginacion import LocalPagination


class AutorViewSet(LocalPagination, viewsets.ModelViewSet):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    # pagination_class = MiSetPagination

    """
    def get_queryset(self):
        queryset = Autor.objects.all()
        return queryset
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        all = self.request.query_params.get('all', None)
        # if all == 'true':
        #    self.pagination_class = None
        #    return Autor.objects.all()
        if query is not None:
            queryall = (Q(nombre__icontains=query),
                        Q(direccion__icontains=query))
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
    """

    @list_route(url_path='export')
    def reporte_autores(self, request, *args, **kwargs):
        lista = []
        pre_query = self.get_queryset().values()
        for x in pre_query:
            lista.append([x['nombre'], x['direccion']])
        print(lista)
        data = Autor.objects.pdf(lista, 'mi primer reporte')
        # data = self.get_queryset().filter(autors=pk)
        # return Response({'detail':str('Exportado a PDF')})
        return Response(data)

    @detail_route(url_path='libros')
    def autor_libros(self, request, pk=None):
        autor = self.get_queryset().get(pk=pk)
        libros = Libro.objects.filter(autors=pk).values()
        libros_count = Libro.objects.filter(autors=pk).count()
        results = {
            'autor': autor.nombre,
            'cantidad': libros_count,
            'libros': libros
        }
        return Response({'detail': results})
