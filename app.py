# from flask import Flask, request, jsonify
# import pandas as pd
# import joblib
# import numpy as np

# from flask_cors import CORS


# # ----------------- Load models and dataset -----------------
# location_model = joblib.load("location_model.pkl")
# price_model = joblib.load("price_model.pkl")
# amenity_model = joblib.load("amenity_model.pkl")
# mlb = joblib.load("mlb.pkl")

# # Load your dataset (must match your model's training data structure)
# df = pd.read_csv("Dataset_Cleaned.csv")  # Replace with your actual dataset file
# df['Price_Category'] = df['Price (LKR)'].apply(lambda x: 'cheap' if x < 10000 else 'affordable' if x < 20000 else 'expensive')
# # df['Amenities_List'] = df['Amenities'].apply(lambda x: [a.strip().lower() for a in x.split(',')])
# df['Amenities_List'] = df['Amenities'].fillna("").apply(lambda x: [a.strip().lower() for a in str(x).split(',') if a.strip()])


# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"])  # ✅ FIXED: match React origin

# def extract_filters_custom_model(query, threshold=0.3):
#     query = query.lower()

#     loc = location_model.predict([query])[0]
#     price = price_model.predict([query])[0]

#     # Get probabilities per amenity
#     probs = amenity_model.predict_proba([query])
#     pred_amenities = [
#         mlb.classes_[i]
#         for i, p in enumerate(probs)
#         if isinstance(p, (np.ndarray, list)) and p[0] >= threshold
#     ]

#     return {
#         "location": loc,
#         "price_category": price,
#         "amenities": pred_amenities
#     }


# def search_boarding_houses(query):
#     filters = extract_filters_custom_model(query)

#     results = df[
#         df['Location'].str.lower().str.contains(filters['location'].lower()) &
#         df['Price_Category'].str.lower().str.contains(filters['price_category'].lower())
#     ]

#     for amenity in filters['amenities']:
#         results = results[results['Amenities'].fillna("").str.lower().str.contains(amenity)]

#     top = results.head(5)[['Boarding_House_ID', 'Location', 'Amenities']]
#     formatted = [
#         {
#             "id": row['Boarding_House_ID'],
#             "location": row['Location'],
#             "amenities": [a.strip() for a in str(row['Amenities']).split(',') if a.strip()],
#             "score": 1.0  # Static score for now, can add logic later
#         } for _, row in top.iterrows()
#     ]
#     return formatted

# @app.route("/search", methods=["POST"])
# def search():
#     try:
#         query = request.json.get("query", "").strip()
#         if not query:
#             return jsonify({"results": [], "message": "Empty query"}), 400

#         results = search_boarding_houses(query)
#         return jsonify({"results": results, "message": "Success"}), 200

#     except Exception as e:
#         print("🔥 ERROR:", str(e))  # <-- Make sure this is in place!
#         return jsonify({"results": [], "message": "Server error", "error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS

# ----------------- Load models and dataset -----------------
location_model = joblib.load("location_model.pkl")
price_model = joblib.load("price_model.pkl")
amenity_model = joblib.load("amenity_model.pkl")
mlb = joblib.load("mlb.pkl")

# Load your dataset
df = pd.read_csv("Dataset_Cleaned.csv")
df['Price_Category'] = df['Price (LKR)'].apply(
    lambda x: 'cheap' if x < 10000 else 'affordable' if x < 20000 else 'expensive'
)
df['Amenities_List'] = df['Amenities'].fillna("").apply(
    lambda x: [a.strip().lower() for a in str(x).split(',') if a.strip()]
)

# ----------------- Flask App Setup -----------------
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# ----------------- Filter Extraction -----------------
def extract_filters_custom_model(query, threshold=0.3):
    query = query.lower()
    loc = location_model.predict([query])[0]
    price = price_model.predict([query])[0]
    probs = amenity_model.predict_proba([query])

    pred_amenities = [
        mlb.classes_[i]
        for i, p in enumerate(probs)
        if isinstance(p, (np.ndarray, list)) and p[0] >= threshold
    ]

    return {
        "location": loc,
        "price_category": price,
        "amenities": pred_amenities
    }

# ----------------- Search Function -----------------
def search_boarding_houses(query):
    filters = extract_filters_custom_model(query)

    results = df[
        df['Location'].str.lower().str.contains(filters['location'].lower(), na=False) &
        df['Price_Category'].str.lower().str.contains(filters['price_category'].lower(), na=False)
    ]

    for amenity in filters['amenities']:
        results = results[
            results['Amenities'].fillna("").str.lower().str.contains(amenity, na=False)
        ]

    top = results.head(5)[['Boarding_House_ID', 'Location', 'Amenities']]
    formatted = [
        {
            "id": row['Boarding_House_ID'],
            "location": row['Location'],
            "amenities": [a.strip() for a in str(row['Amenities']).split(',') if a.strip()],
            "score": 1.0
        }
        for _, row in top.iterrows()
    ]
    return formatted

# ----------------- /search API -----------------
@app.route("/search", methods=["POST"])
def search():
    try:
        query = request.json.get("query", "").strip()
        if not query:
            return jsonify({"results": []}), 400

        results = search_boarding_houses(query)
        return jsonify({"results": results}), 200

    except Exception as e:
        print("🔥 ERROR:", str(e))
        return jsonify({"results": [], "error": str(e)}), 500

# ----------------- Run the App -----------------
if __name__ == "__main__":
    app.run(debug=True)
