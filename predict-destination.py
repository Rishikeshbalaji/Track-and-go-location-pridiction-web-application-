#!/usr/bin/env python3

from datetime import datetime
import pandas as pd
import joblib

from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="track&go")


def GetCorrFromAdress(address):
    location = geolocator.geocode(address)
    return location.latitude, location.longitude


def main(time, startadr):
    """

    :param time:
    :param startadr:
    :return:
    """

    model_file = 'RFC_model.pkl'

    X = feature_generator(time, startadr)

    model = joblib.load(model_file)
    result = model.predict(X)

    result_address = geolocator.reverse((result)).address

    print("destination_corr", result)
    print("destination_address", result_address)
    return result_address


def feature_generator(time, startadr):
    """

    :param time:
    :param startadr:
    :return:
    """
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")

    df = pd.DataFrame(columns=['latStart', 'lonStart', 'week', 'dayofweek', 'hours'])
    df.loc[0, 'latStart'], df['lonStart'] = GetCorrFromAdress(startadr)
    df.loc[0, 'eventTimeStart'] = time
    df["week"] = df.eventTimeStart.dt.week
    df["dayofweek"] = df.eventTimeStart.dt.dayofweek
    df["hours"] = df.eventTimeStart.dt.hour
    cluster_model = joblib.load("k-means_cluster.pkl")
    df = df.drop(["eventTimeStart"], axis=1)
    df['cluster'] = cluster_model.predict(df)

    return df


if __name__ == "__main__":
    main("2016-02-29 23:15:47", "BP, Broadway, Brooklyn, Kings County, New York, 11207, United States")
