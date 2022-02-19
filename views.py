from django.shortcuts import render, get_object_or_404
from .models import Tracker
from .forms import TrackerXForm, TrackerYForm
from geopy.geocoders import Nominatim, Photon
from geopy.distance import geodesic
from .utils import get_geo, get_center_coordinates, get_zoom
import folium
from .predictDestination import predict

# Create your views here.

geolocator = Photon(user_agent="measurements")


def calculate_distance_view(request):
    # initial values
    distance = None
    destination = None

    default_source = "BP, Broadway, Brooklyn, Kings County, New York, 11207, United States"
    default_time = "2016-02-29 23:15:47"

    source_form = TrackerXForm()
    destination_form = TrackerYForm()
    source_form.fields['source'].initial = default_source
    source_form.fields['start_time'].initial = default_time

    if request.method == 'POST':
        form = TrackerXForm(request.POST)
        if form.is_valid():
            time = form.cleaned_data.get('start_time')
            source = form.cleaned_data.get('source')
            destination = predict(time, source)
            print(source, destination)
            destination_form.fields['destination'].initial = destination
            print(destination)

    context = {
        'distance': distance,
        'destination': destination,
        'form1': source_form,
        'form2': destination_form
    }

    return render(request, 'measurements/Index.html', context)
