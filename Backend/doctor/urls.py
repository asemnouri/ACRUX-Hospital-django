from django.urls import path 
from doctor.views import DoctorList,DoctorDetail,DoctorUpdate, doctorCreate

app_name = 'doctor'

urlpatterns = [
    path('' , DoctorList.as_view()),
    path('details' , DoctorDetail),
    path('update',DoctorUpdate ),
    path('create', doctorCreate)
]