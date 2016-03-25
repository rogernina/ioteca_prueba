from django.conf.urls import url, include
from rest_framework import routers
from .views.CategoriaView import CategoriaViewSet
from .views.AutorView import AutorViewSet
from .views.LibroView import LibroViewSet

router = routers.DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'autors', AutorViewSet, 'autors-view')
router.register(r'libros', LibroViewSet, 'libros-view')

urlpatterns = [
    url(r'^', include(router.urls)),
]
