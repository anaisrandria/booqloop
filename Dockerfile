#
FROM python:3

#
WORKDIR /code


COPY requirements.txt ./

#
RUN pip install --no-cache-dir -r requirements.txt

#
COPY . .

#
CMD ["uvicorn", "api.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80", "--reload"]