from django.urls import path 
from patient.views import PatientList,PatientUpdate,PateintDetails


app_name = 'patient'

urlpatterns = [
    path('' ,PatientList.as_view()),
    path("details",PateintDetails),
    path('upload', PatientUpdate)
]