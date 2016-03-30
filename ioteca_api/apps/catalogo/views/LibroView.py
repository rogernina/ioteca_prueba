from rest_framework import serializers, viewsets
from ..models.Libro import Libro


class LibroSerializer(serializers.ModelSerializer):
	class Meta:
		model = Libro

class LibroViewSet(viewsets.ModelViewSet):
	queryset = Libro.objects.all()
	serializer_class = LibroSerializer
