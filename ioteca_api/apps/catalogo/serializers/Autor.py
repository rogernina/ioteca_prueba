from rest_framework import serializers
from ..models.Autor import Autor

class AutorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Autor
