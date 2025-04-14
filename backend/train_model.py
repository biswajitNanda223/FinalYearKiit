# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.pipeline import make_pipeline
# import joblib

# # Sample dataset
# data = pd.DataFrame({
#     "symptoms": ["fever cough", "headache nausea", "chest pain fatigue"],
#     "disease": ["flu", "migraine", "heart disease"]
# })

# # Train Model
# vectorizer = TfidfVectorizer()
# model = MultinomialNB()
# pipeline = make_pipeline(vectorizer, model)

# X = data["symptoms"]
# y = data["disease"]
# pipeline.fit(X, y)

# # Save Model
# joblib.dump(pipeline, "disease_model.pkl")
# print("Model trained and saved!")
