import cv2
import numpy as np
import py360convert
import os
import sys

TARGET_SIZE = 1024

def load_and_square(path):
    img = cv2.imread(path)
    if img is None:
        raise ValueError(f"Error loading {path}")
    h, w = img.shape[:2]
    if h != w:
        img = cv2.resize(img, (TARGET_SIZE, TARGET_SIZE))
    return img

def generate_panorama(input_dir, output_path):
    face_files = {
        'back': os.path.join(input_dir, 'back.jpg'),
        'left': os.path.join(input_dir, 'left.jpg'),
        'front': os.path.join(input_dir, 'front.jpg'),
        'right': os.path.join(input_dir, 'right.jpg'),
        'up': os.path.join(input_dir, 'up.jpg'),
        'down': os.path.join(input_dir, 'down.jpg')
    }

    faces = {name: load_and_square(path) for name, path in face_files.items()}
    cubemap = [faces['back'], faces['left'], faces['front'],
              faces['right'], faces['up'], faces['down']]
    
    equi_img = py360convert.c2e(cubemap, h=1024, w=2048, cube_format='list')
    cv2.imwrite(output_path, equi_img)
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <input_directory>")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_path = os.path.join(input_dir, 'panorama.jpg')
    
    try:
        generate_panorama(input_dir, output_path)
        print(f"Panorama generated at {output_path}")
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)