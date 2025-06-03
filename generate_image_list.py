import os
import json
import re

def natural_sort_key(s):
    # Correct regex: split on digits
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def generate_image_list():
    # Define the folders to scan
    base_path = os.path.join('resources', 'images')
    categories = ['varsity','jv','mod9','mod']
    output_file = os.path.join(base_path, 'collages.json')

    # Collect images from all categories in the specified order
    image_list = []
    for category in categories:
        category_path = os.path.join(base_path, category)
        if os.path.exists(category_path):
            image_files = [f for f in os.listdir(category_path) if f.lower().endswith(('.jpeg', '.jpg', '.png'))]
            image_files.sort(key=natural_sort_key)  # Natural sort within the category
            for image in image_files:
                image_list.append({
                    "filename": os.path.join(category, image).replace('\\', '/'),
                    "category": category.capitalize()
                })

    # Write the list to a JSON file
    with open(output_file, 'w') as json_file:
        json.dump(image_list, json_file, indent=4)

    print(f"Image list JSON with metadata generated at {output_file}")

if __name__ == "__main__":
    generate_image_list()