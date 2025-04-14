import fitz  # PyMuPDF
import pickle
import re
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# Download required NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Load the symptom → medicine dictionary from .pkl
with open("symptom_medicine_db.pkl", "rb") as f:
    symptom_medicine_db = pickle.load(f)

# Extract raw text from uploaded PDF
def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    return "".join(page.get_text("text") for page in doc).strip()

# Extract symptoms from text
def extract_symptoms(text):
    text = text.lower()
    symptoms_found = set()
    stop_words = set(stopwords.words('english'))
    sentences = sent_tokenize(text)

    for sentence in sentences:
        words = word_tokenize(sentence)
        filtered = [w for w in words if w.isalpha() and w not in stop_words]
        for word in filtered:
            if word in symptom_medicine_db:
                symptoms_found.add(word)

    return list(symptoms_found)

# Suggest medicines based on symptoms
def suggest_medicine(symptoms):
    meds = []
    for symptom in symptoms:
        if symptom in symptom_medicine_db:
            meds.extend(symptom_medicine_db[symptom])
    return list(set(meds))

# Get direct search URLs on pharma sites
def get_medicine_price_links(medicine_name):
    query = medicine_name.replace(" ", "+")
    urls = {
        "Tata 1mg": f"https://www.1mg.com/search/all?name={query}",
        "Netmeds": f"https://www.netmeds.com/catalogsearch/result?q={query}",
        "PharmEasy": f"https://pharmeasy.in/search/all?name={query}",
        "Apollo Pharmacy": f"https://www.apollopharmacy.in/search-medicines/{query}",
        "Flipkart Health+": f"https://www.flipkart.com/search?q={query}&otracker=search",
    }
    return [(site, url) for site, url in urls.items()]

# Compare prices across platforms
def compare_prices(medicine_list):
    return {medicine: get_medicine_price_links(medicine) for medicine in medicine_list}
