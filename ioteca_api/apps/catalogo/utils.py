from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class MiSetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def siguente(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return page_number

    def anterior(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        return page_number

    def plus(self):
        if not self.page.has_next():
            return None
        page = self.page.next_page_number() - 1
        return page

    def range(self):
        total = self.page.paginator.count
        start = self.page.start_index()
        end = self.page.end_index()
        rangep = '({0} - {1})/{2}'.format(start, end, total)
        return rangep
    # 'page': self.plus(),

    def get_paginated_response(self, data):
        return Response({
            'options': {
                'count': self.page.paginator.count,
                'pages': self.page.paginator.num_pages,

                'page': self.page.number,
                'next': self.siguente(),
                'previous': self.anterior(),
                'range': self.range(),
                'page_size': self.page_size,
                'per': self.page_size,
            },
            'results': data
        })
