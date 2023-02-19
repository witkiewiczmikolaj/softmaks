FROM python:3.10.6
WORKDIR /

COPY requirements.txt .
COPY . .
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./app.py"]