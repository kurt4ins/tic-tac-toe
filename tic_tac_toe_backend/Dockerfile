FROM python:3.13-slim

WORKDIR /app

COPY . /app/

RUN pip install -r requirements.txt

CMD python manage.py migrate \
    && daphne -b 0.0.0.0 -p 8000 tic_tac_toe_backend.asgi:application
    # && python manage.py runserver 0.0.0.0:8000

