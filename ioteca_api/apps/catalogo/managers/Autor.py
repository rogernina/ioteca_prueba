from django.db import connection, transaction, models

class AutorManager(models.Manager):

	@staticmethod
	def listar(queryset, query_field, query, field, order):
		if query is not None:
			kwargs = {'{0}__{1}'.format(query_field, 'icontains'): query}
			data = queryset.filter(**kwargs).order_by(''+order+''+field+'')
			return data
		else:
			data = queryset.order_by(''+order+''+field+'')
			return data

	@staticmethod
	def autores():
		def dic(cursor):
			columnas = [col[0].lower() for col in cursor.description]
			return [dict(zip(columnas, row)) for row in cursor.fetchall()]
		c = connection.cursor()
		try:
			c.execute("SELECT a.nombre, a.fecha_nac FROM catalogo_autor a")
			r = dic(c)
		finally:
			c.close()
		return r