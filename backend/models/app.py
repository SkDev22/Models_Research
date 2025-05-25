import os
import traceback
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import joblib
from datetime import datetime, timedelta

# Import your pricing_model module with classes and functions
from pricing_model import (
    BoardingHouseAmenities, LocationFeatures, ReviewMetrics,
    get_seasonal_factor, predict_monthly_prices, recommend_price_range
)

app = Flask(__name__, static_url_path='')
CORS(app, origins=["http://localhost:5173"])  # adjust origin as needed

# Base directory for models and data
models_dir = os.path.dirname(__file__)
# models_dir = os.path.join(base_dir, "models")

# === Load AI Search Models ===
location_model = joblib.load(os.path.join(models_dir, "location_model.pkl"))
price_model = joblib.load(os.path.join(models_dir, "price_model.pkl"))
amenity_model = joblib.load(os.path.join(models_dir, "amenity_model.pkl"))
mlb = joblib.load(os.path.join(models_dir, "mlb.pkl"))

# Load dataset for AI Search
df = pd.read_csv(os.path.join(models_dir, "Dataset_Cleaned.csv"))
df['Price_Category'] = df['Price (LKR)'].apply(
    lambda x: 'cheap' if x < 10000 else 'affordable' if x < 20000 else 'expensive'
)
df['Amenities_List'] = df['Amenities'].fillna("").apply(
    lambda x: [a.strip().lower() for a in str(x).split(',') if a.strip()]
)

# === Load Booking Forecast Models ===
booking_model_path = os.path.join(models_dir, "booking_model.pkl")
with open(booking_model_path, "rb") as f:
    booking_model = pickle.load(f)

booking_forecast_model_path = os.path.join(models_dir, "booking_forecast_model.pkl")
booking_forecast_model = joblib.load(booking_forecast_model_path)

# === Load Pricing Model and Scaler ===
try:
    pricing_model = joblib.load(os.path.join(models_dir, "pricing_model.joblib"))
    scaler = joblib.load(os.path.join(models_dir, "scaler.joblib"))
    print("Pricing model and scaler loaded successfully")
except Exception as e:
    print(f"Error loading pricing model or scaler: {e}")
    traceback.print_exc()

# Helper for booking forecast features
def generate_forecast_features(start_date):
    forecast_dates = pd.date_range(start=start_date, periods=30)
    df_features = pd.DataFrame({'date': forecast_dates})
    df_features['day_of_week'] = df_features['date'].dt.dayofweek
    df_features['week_of_year'] = df_features['date'].dt.isocalendar().week
    df_features['month'] = df_features['date'].dt.month
    df_features['year'] = df_features['date'].dt.year
    df_features['day'] = df_features['date'].dt.day
    df_features['is_weekend'] = df_features['day_of_week'].isin([5, 6]).astype(int)
    return df_features

# --- AI Search Functions ---
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

def get_distance_category(distance):
    """Categorize distance and return category name and price factor."""
    # Ensure distance is a float
    try:
        distance = float(distance)
    except (ValueError, TypeError):
        distance = 0.0  # Default to 0 if conversion fails
        
    if 0.5 <= distance <= 2:
        return {
            'category': 'Premium Location',
            'description': 'Walking distance to university, prime location',
            'factor': 1.3  # 30% premium
        }
    elif 2 < distance <= 6:
        return {
            'category': 'Standard Location',
            'description': 'Convenient distance, good transport options',
            'factor': 1.0  # base price
        }
    else:
        return {
            'category': 'Budget Location',
            'description': 'Further from university, more affordable',
            'factor': 0.8  # 20% discount
        }

def get_room_price_factor(room_type, num_sharing):
    """Calculate room price factors based on type and sharing."""
    base_prices = {
        'single': {'base': 1.0, 'max_sharing': 1},
        'shared-2': {'base': 1.6, 'max_sharing': 2},  # 60% more than single for whole room
        'shared-4': {'base': 2.4, 'max_sharing': 4}   # 140% more than single for whole room
    }
    
    if room_type not in base_prices:
        raise ValueError(f"Invalid room type: {room_type}")
    
    room_info = base_prices[room_type]
    if num_sharing > room_info['max_sharing']:
        raise ValueError(f"Maximum {room_info['max_sharing']} students allowed for {room_type}")
    
    # Calculate per-person price factor
    total_price_factor = room_info['base']
    per_person_factor = total_price_factor / num_sharing
    
    return {
        'total_price_factor': total_price_factor,
        'per_person_factor': per_person_factor,
        'max_sharing': room_info['max_sharing'],
        'description': f"{room_type.replace('-', ' ').title()} ({num_sharing} of {room_info['max_sharing']} sharing)"
    }

def get_seasonal_reason(month):
    """Get the reason for seasonal price changes based on the month."""
    academic_terms = {
        1: "Mid academic year, moderate demand",
        2: "Mid academic year, stable demand",
        3: "End of academic year, lower demand",
        4: "University admissions period, increasing demand",
        5: "Start of new academic year, peak demand",
        6: "Early academic term, high demand",
        7: "Mid-term period, stable demand",
        8: "Mid-term period, stable demand",
        9: "End of term approaching, moderate demand",
        10: "Term break, lower demand",
        11: "Start of final term, demand picking up",
        12: "End of year examinations, moderate demand"
    }
    return academic_terms.get(month, "Regular season")

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
    top = results.head(5)[['Boarding_House_ID', 'Location', 'Amenities', 'Price (LKR)']]
    formatted = [
        {
            "id": row['Boarding_House_ID'],
            "location": row['Location'],
            "amenities": [a.strip() for a in str(row['Amenities']).split(',') if a.strip()],
            "price": row['Price (LKR)'],
            "score": 1.0
        }
        for _, row in top.iterrows()
    ]
    return formatted







@app.route("/search", methods=["POST"])
def search_api():
    try:
        query = request.json.get("query", "").strip()
        if not query:
            return jsonify({"results": []}), 400
        results = search_boarding_houses(query)
        return jsonify({"results": results}), 200
    except Exception as e:
        print("🔥 ERROR in /search:", e)
        traceback.print_exc()
        return jsonify({"results": [], "error": str(e)}), 500



# --- Booking Forecast API ---
@app.route("/predict", methods=["POST"])
def predict_booking():
    try:
        data = request.json
        date = data.get("date")
        if not date:
            return jsonify({"error": "Date is required"}), 400
        input_data = pd.DataFrame({
            "ds": pd.date_range(start=date, periods=30, freq="D"),
            "OccupancyRate": [70] * 30,
            "ExternalFactor": [1.0] * 30
        })
        forecast = booking_model.predict(input_data)
        avg_room_price = 20000
        forecast["Projected Revenue"] = forecast["yhat"] * avg_room_price
        response_data = forecast[["ds", "yhat", "yhat_lower", "yhat_upper", "Projected Revenue"]]
        response_data.columns = ["Date", "Prediction", "Lower Bound", "Upper Bound", "Revenue"]
        return jsonify(response_data.to_dict(orient="records"))
    except Exception as e:
        print(f"🔥 ERROR in /predict: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 400

@app.route("/api/predict", methods=["POST"])
def predict_booking_forecast():
    try:
        data = request.json
        input_date = data.get("start_date")
        start_date = datetime.strptime(input_date, "%Y-%m-%d")
        df_features = generate_forecast_features(start_date)
        X = df_features[['day_of_week', 'week_of_year', 'month', 'year', 'day', 'is_weekend']]
        df_features['predicted_bookings'] = booking_forecast_model.predict(X).round().astype(int)
        df_features['predicted_revenue'] = df_features['predicted_bookings'] * 18000
        result = df_features[['date', 'predicted_bookings', 'predicted_revenue']].to_dict(orient='records')
        return jsonify({"success": True, "forecast": result})
    except Exception as e:
        print(f"🔥 ERROR in /api/predict: {e}")
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500

# --- Pricing Prediction API ---
@app.route('/predict-price', methods=['POST'])
def predict_price():
    try:
        print("Received prediction request")
        data = request.json

        # Create amenities object
        amenities = BoardingHouseAmenities()
        for key, value in data.get('amenities', {}).items():
            setattr(amenities, key, value)

        # Set room type
        amenities.room_type = data.get('room_type', 'single')

        # Create location object
        location = LocationFeatures()
        for key, value in data.get('location', {}).items():
            setattr(location, key, value)

        # Create reviews object
        reviews = ReviewMetrics()
        for key, value in data.get('reviews', {}).items():
            setattr(reviews, key, value)

        # Get distance category and room factors
        distance_info = get_distance_category(location.distance_to_uni)
        room_info = get_room_price_factor(data.get('room_type', 'single'), int(data.get('num_sharing', 1)))

        # Use the predict_monthly_prices function
        predictions = predict_monthly_prices(
            distance=location.distance_to_uni,
            amenities=amenities,
            model=pricing_model,
            scaler=scaler,
            location=location,
            reviews=reviews
        )
        print(f"Monthly predictions: {predictions}")

        # Calculate recommended price range
        amenity_score = amenities.calculate_amenity_score()
        recommended_min, recommended_max = recommend_price_range(location.distance_to_uni, amenity_score)
        predictions['recommended_range'] = {
            'min': recommended_min,
            'max': recommended_max
        }

        # Apply distance and room type factors to all predictions
        for key in ['last_month', 'current', 'next_month', 'next_year_estimate']:
            if key in predictions:
                base_price = predictions[key]
                predictions[key] = base_price * distance_info['factor']
                predictions[f"{key}_total"] = predictions[key] * room_info['total_price_factor']
                predictions[key] = predictions[key] * room_info['per_person_factor']

        current_month = datetime.now()
        last_month = (current_month - timedelta(days=30))
        next_month = (current_month + timedelta(days=30))

        current_factor = get_seasonal_factor(current_month.month)
        last_factor = get_seasonal_factor(last_month.month)
        next_factor = get_seasonal_factor(next_month.month)

        last_to_current_change = ((predictions['current'] - predictions['last_month']) / predictions['last_month']) * 100
        current_to_next_change = ((predictions['next_month'] - predictions['current']) / predictions['current']) * 100

        response = {
            'predicted_prices': {
                'last_month': {
                    'month': last_month.strftime('%B'),
                    'price': round(predictions['last_month'], 2),
                    'total_room_price': round(predictions['last_month_total'], 2),
                    'seasonal_factor': round(last_factor, 2),
                    'reason': get_seasonal_reason(last_month.month)
                },
                'current': {
                    'month': current_month.strftime('%B'),
                    'price': round(predictions['current'], 2),
                    'total_room_price': round(predictions['current_total'], 2),
                    'seasonal_factor': round(current_factor, 2),
                    'reason': get_seasonal_reason(current_month.month),
                    'change_from_last': round(last_to_current_change, 1)
                },
                'next_month': {
                    'month': next_month.strftime('%B'),
                    'price': round(predictions['next_month'], 2),
                    'total_room_price': round(predictions['next_month_total'], 2),
                    'seasonal_factor': round(next_factor, 2),
                    'reason': get_seasonal_reason(next_month.month),
                    'change_from_current': round(current_to_next_change, 1)
                },
                'next_year_estimate': round(predictions['next_year_estimate'], 2),
                'next_year_total': round(predictions['next_year_estimate_total'], 2)
            },
            'location_info': distance_info,
            'room_info': room_info,
            'amenity_score': round(amenities.calculate_amenity_score(), 2),
            'location_score': round(predictions['location_score'], 2) if predictions['location_score'] else 0,
            'review_score': round(predictions['review_score'], 2) if predictions['review_score'] else 0,
            'amenities_list': predictions['amenities'],
            'recommended_range': {
                'min': round(predictions['recommended_range']['min'], 2),
                'max': round(predictions['recommended_range']['max'], 2)
            }
        }
        print(f"Sending response: {response}")
        return jsonify(response)

    except Exception as e:
        print(f"Error in prediction endpoint: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
