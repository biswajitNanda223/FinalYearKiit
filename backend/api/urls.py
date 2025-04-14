from django.urls import path
from .views import ContactMessageView, predict_diabetes, analyze_report, chat_with_gemini, register_user,login_user,logout_user , test_api, predict_disease

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("logout/", logout_user, name="logout"),
    path('test/', test_api),
    path("predict-disease/", predict_disease, name="predict-disease"),
    path("chat/", chat_with_gemini, name="chat"),
    path("analyze-report/",  analyze_report, name=" analyze_report"),
    path('predict/', predict_diabetes),
     path('contact/', ContactMessageView.as_view(), name='contact'),

]
