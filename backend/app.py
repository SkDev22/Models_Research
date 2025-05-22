from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load trained model
model = joblib.load("booking_forecast_model.pkl")

# Helper: Generate features from a start date for next 30 days
def generate_forecast_features(start_date):
    forecast_dates = pd.date_range(start=start_date, periods=30)
    df = pd.DataFrame({'date': forecast_dates})
    df['day_of_week'] = df['date'].dt.dayofweek
    df['week_of_year'] = df['date'].dt.isocalendar().week
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    df['day'] = df['date'].dt.day
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
    return df

# API endpoint
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_date = data.get("start_date")  # expects "YYYY-MM-DD"
    
    try:
        start_date = datetime.strptime(input_date, "%Y-%m-%d")
        df = generate_forecast_features(start_date)
        X = df[['day_of_week', 'week_of_year', 'month', 'year', 'day', 'is_weekend']]
        df['predicted_bookings'] = model.predict(X).round().astype(int)
        df['predicted_revenue'] = df['predicted_bookings'] * 18000  # Use your average price

        result = df[['date', 'predicted_bookings', 'predicted_revenue']].to_dict(orient='records')
        return jsonify({"success": True, "forecast": result})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
