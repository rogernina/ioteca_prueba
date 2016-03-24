from django.db import connection, transaction, models
from fpdf import FPDF


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

	@staticmethod
	def pdf(query, title):
		pdf=FPDF(format='letter', unit='in')
		pdf.add_page()
		pdf.set_font('Times','',7.0)
		epw = pdf.w - 2*pdf.l_margin
		col_width = epw/4

		pdf.set_font('Times','B',14.0)
		pdf.cell(epw, 0.0, title, align='C')
		pdf.set_font('Times','',10.0)
		pdf.ln(0.5)
		th = pdf.font_size

		for row in query:
			for datum in row:
				pdf.cell(col_width, th, str(datum), border=1)
			pdf.ln(th)

		pdf.ln(4*th)

		return pdf.output('reporte.pdf','F')







