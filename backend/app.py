from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "models/booking_model.pkl")
with open(model_path, "rb") as file:
    model = pickle.load(file)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        date = data.get("date")

        if not date:
            return jsonify({"error": "Date is required"}), 400

        input_data = pd.DataFrame({
            "ds": pd.date_range(start=date, periods=30, freq="D"),
            "OccupancyRate": [70] * 30,
            "ExternalFactor": [1.0] * 30
        })

        forecast = model.predict(input_data)
        
        avg_room_price = 20000
        forecast["Projected Revenue"] = forecast["yhat"] * avg_room_price

        response_data = forecast[["ds", "yhat", "yhat_lower", "yhat_upper","Projected Revenue"]]
        response_data.columns = ["Date", "Prediction", "Lower Bound", "Upper Bound", "Revenue"]

        return jsonify(response_data.to_dict(orient="records"))

    except Exception as e:
        print(f"Error in API response: {str(e)}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)


