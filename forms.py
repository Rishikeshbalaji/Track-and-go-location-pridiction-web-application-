from django import forms
from .models import Tracker


class TrackerXForm(forms.ModelForm):
    class Meta:
        model = Tracker
        fields = ('source', 'start_time',)


class TrackerYForm(forms.ModelForm):
    class Meta:
        model = Tracker
        fields = ('destination',)
