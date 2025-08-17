from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RequestLog
import math
import logging
import json

fib_cache = {}
fact_cache = {}

logger = logging.getLogger("math_operations")
handler = logging.FileHandler("math_operations.log")
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

class HealthView(APIView):
    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)

class PowView(APIView):
    def post(self, request):
        base = request.data.get('base')
        exp = request.data.get('exp')
        try:
            result = math.pow(float(base), float(exp))
            RequestLog.objects.create(operation='pow', input_data=f"base={base},exp={exp}", result=str(result), user=str(request.user))
            logger.info(f"POW: base={base}, exp={exp}, result={result}, user={request.user}")
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class FibonacciView(APIView):
    def post(self, request):
        n = request.data.get('n')
        try:
            n = int(n)
            if n < 0:
                raise ValueError('n must be >= 0')
            if n in fib_cache:
                a = fib_cache[n]
            else:
                a, b = 0, 1
                for _ in range(n):
                    a, b = b, a + b
                fib_cache[n] = a
            RequestLog.objects.create(operation='fibonacci', input_data=f"n={n}", result=str(a), user=str(request.user))
            logger.info(f"FIBONACCI: n={n}, result={a}, user={request.user}")
            return Response({'result': a}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class FactorialView(APIView):
    def post(self, request):
        n = request.data.get('n')
        try:
            n = int(n)
            if n < 0:
                raise ValueError('n must be >= 0')
            if n in fact_cache:
                result = fact_cache[n]
            else:
                result = math.factorial(n)
                fact_cache[n] = result
            RequestLog.objects.create(operation='factorial', input_data=f"n={n}", result=str(result), user=str(request.user))
            logger.info(f"FACTORIAL: n={n}, result={result}, user={request.user}")
            return Response({'result': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
