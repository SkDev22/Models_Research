import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import sys
import json
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

def predict_image(image_path):
    try:
        # Load model (update path as needed)
        model_path = os.path.join(os.path.dirname(__file__), "keras_model.h5")
        model = load_model(model_path, compile=False)
        
        # Process image
        image = Image.open(image_path).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array
        
        # Predict
        prediction = model.predict(data)
        class_names = ["Table", "Fan", "Cupboard", "Chair", "Bed"]
        index = np.argmax(prediction)
        
        result = {
            "success": True,
            "class": class_names[index]  # Only return the class name
        }
        
        # Print ONLY the JSON result
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_result))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.stdout.write(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    try:
        predict_image(sys.argv[1])
    except Exception as e:
        sys.stdout.write(json.dumps({"error": str(e)}))
        sys.exit(1)