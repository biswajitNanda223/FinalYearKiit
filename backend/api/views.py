from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import  Doctor

def test_api(request):
    return JsonResponse({"message": "API is working!"})

# Contact form submission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactMessageSerializer

class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message received!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


import pickle
import joblib
from django.http import JsonResponse
from rest_framework.decorators import api_view


model = joblib.load("fine_tuned_ensemble_model.pkl")

# Load the TF-IDF vectorizer
with open("tfidf_vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

@api_view(['POST'])
def predict_disease(request):
    data = request.data
    symptoms = data.get("symptoms", "")

    if not symptoms:
        return JsonResponse({"error": "No symptoms provided"}, status=400)

    # Convert symptoms text into numerical features
    symptoms_transformed = vectorizer.transform([symptoms])

    # Predict the disease
    prediction = model.predict(symptoms_transformed)[0]

    doctors = Doctor.objects.filter(specialization__icontains=prediction).values(
        "name", "hospital", "experience", "contact"
    )

    
    return JsonResponse({"predicted_disease": prediction, "suggested_doctors": list(doctors)})




from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer
import json

@api_view(["POST"])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_user(request):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)

    if user:
        login(request, user)
        return Response(
            {
                "message": "Login successful!",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.username,
                    "age": user.age,
                    "gender": user.gender,
                },
            },
            status=status.HTTP_200_OK,
        )
    else:
        return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout_user(request):
    logout(request)
    return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)

import json
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GENAI_API_KEY = os.getenv("API_KEY")

# Configure Google Gemini API
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)
else:
    raise ValueError("Missing Gemini API key! Set it in the .env file.")

@csrf_exempt
def chat_with_gemini(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")

            if not user_message:
                return JsonResponse({"error": "Message is required"}, status=400)

            # Get the correct model name
            model = genai.GenerativeModel("gemini-1.5-pro")  # Use latest available model

            # Generate response
            response = model.generate_content(user_message)

            # Extract response text
            bot_reply = response.text if hasattr(response, "text") else "No response from chatbot."

            return JsonResponse({"response": bot_reply})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# ner
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import extract_text_from_pdf, extract_symptoms, suggest_medicine, compare_prices

@api_view(["POST"])
def analyze_report(request):
    print("=== DEBUGGING analyze_report ===")
    print("FILES:", request.FILES)
    print("POST DATA:", request.POST)
    print("CONTENT TYPE:", request.content_type)

    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    try:
        text = extract_text_from_pdf(file)
        symptoms = extract_symptoms(text)
        medicines = suggest_medicine(symptoms)
        links = compare_prices(medicines)

        return Response({
            "symptoms": symptoms,
            "medicines": medicines,
            "links": links
        })

    except Exception as e:
        print("ERROR:", str(e))
        return Response({"error": "Failed to process file", "details": str(e)}, status=500)

# diabetes prediction
import os
import numpy as np
import pickle
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Load model and scaler
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')
SCALER_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_scaler.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)
import pandas as pd

@api_view(['POST'])
def predict_diabetes(request):
    try:
        data = request.data

        # Create a dictionary with feature names matching the training set
        input_dict = {
            'Pregnancies': float(data['Pregnancies']),
            'Glucose': float(data['Glucose']),
            'BloodPressure': float(data['BloodPressure']),
            'SkinThickness': float(data['SkinThickness']),
            'Insulin': float(data['Insulin']),
            'BMI': float(data['BMI']),
            'DiabetesPedigreeFunction': float(data['DiabetesPedigreeFunction']),
            'Age': float(data['Age']),
        }

        # Wrap in a DataFrame to preserve feature names
        input_df = pd.DataFrame([input_dict])

        # Preprocess and predict
        scaled_input = scaler.transform(input_df)
        prediction = model.predict(scaled_input)[0]

        return JsonResponse({'prediction': int(prediction)})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
