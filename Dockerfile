FROM ubuntu:18.04

RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
    python3 \
    python3-pip
RUN apt-get install -y libomp-dev libgomp1

RUN pip3 install --upgrade pip==9.0.3 \
    && pip3 install setuptools \
    && pip3 install cmake==3.13.0
RUN pip3 install psycopg2-binary 
# RUN pip install xgboost

# for flask web server
EXPOSE 8081

# set working directory
ADD . /app
WORKDIR /app

# install required libraries
RUN pip3 install -r requirements.txt

# This is the runtime command for the container
CMD python3 app.py