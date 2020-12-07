from django.urls import path 
from patient.views import PatientList

app_name = 'patient'

urlpatterns = [
    path('' ,PatientList.as_view() )
]