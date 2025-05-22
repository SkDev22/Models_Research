from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np
from pricing_model import BoardingHouseAmenities, LocationFeatures, ReviewMetrics, get_seasonal_factor, predict_monthly_prices, recommend_price_range
import traceback
import os
from datetime import datetime, timedelta

app = Flask(__name__, static_url_path='')
CORS(app)

def get_distance_category(distance):
    """Categorize distance and return category name and price factor."""
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

# Load the model and scaler
try:
    model = joblib.load('pricing_model.joblib')
    scaler = joblib.load('scaler.joblib')
    print("Model and scaler loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    traceback.print_exc()

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Received prediction request")
        data = request.json
        print(f"Request data: {data}")
        
        # Create amenities object
        amenities = BoardingHouseAmenities()
        for key, value in data['amenities'].items():
            print(f"Setting amenity {key} to {value}")
            setattr(amenities, key, value)
        
        # Set room type
        amenities.room_type = data.get('room_type', 'single')
        
        # Create location object
        location = LocationFeatures()
        for key, value in data['location'].items():
            print(f"Setting location {key} to {value}")
            setattr(location, key, value)
        
        # Create reviews object
        reviews = ReviewMetrics()
        for key, value in data['reviews'].items():
            print(f"Setting review {key} to {value}")
            setattr(reviews, key, value)
        
        # Get distance category and room factors
        distance_info = get_distance_category(location.distance_to_uni)
        room_info = get_room_price_factor(data.get('room_type', 'single'), int(data.get('num_sharing', 1)))
        
        # Use the predict_monthly_prices function
        try:
            predictions = predict_monthly_prices(
                distance=location.distance_to_uni,
                amenities=amenities,
                model=model,
                scaler=scaler,
                location=location,
                reviews=reviews
            )
            print(f"Monthly predictions: {predictions}")
        except Exception as e:
            print(f"Error in monthly predictions: {str(e)}")
            raise
        
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
                # Apply distance factor
                predictions[key] = base_price * distance_info['factor']
                # Apply room factors
                predictions[f"{key}_total"] = predictions[key] * room_info['total_price_factor']
                predictions[key] = predictions[key] * room_info['per_person_factor']
        
        # Get current month and adjacent months
        current_month = datetime.now()
        last_month = (current_month - timedelta(days=30))
        next_month = (current_month + timedelta(days=30))
        
        # Calculate seasonal factors
        current_factor = get_seasonal_factor(current_month.month)
        last_factor = get_seasonal_factor(last_month.month)
        next_factor = get_seasonal_factor(next_month.month)
        
        # Calculate percentage changes
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
