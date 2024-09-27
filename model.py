from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import pytesseract
from PIL import Image
import re
import nltk

# Download NLTK stopwords data
nltk.download('stopwords')
from nltk.corpus import stopwords

app = Flask(__name__)
CORS(app)

# Path to the Tesseract executable (you may need to adjust this based on your installation)
pytesseract.pytesseract.tesseract_cmd = r'D:\Tesseract-OCR\tesseract.exe'

# Load the BERT model and tokenizer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model_path = 'front-end\src\\trash\model1'
new_model = AutoModelForSequenceClassification.from_pretrained(model_path).to(device)
new_tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

# Set up NLTK stopwords
stop_words = set(stopwords.words('english'))

def extract_important_words_from_image(image):
    # Use pytesseract to extract text
    pil_image = Image.open(image)
    # Use pytesseract to extract text
    text = pytesseract.image_to_string(pil_image)
    # Preprocess the text (optional)
    text = preprocess_text(text)
    return text

def preprocess_text(text):
    # Perform any necessary preprocessing on the text
    # For example, you can remove special characters or perform normalization
    text = re.sub(r'[^A-Za-z\s]', '', text)  # Remove non-alphabetic characters
    text = text.lower()  # Convert text to lowercase
    # Filter out stopwords
    words = text.split()
    filtered_words = [word for word in words if word not in stop_words]
    return ' '.join(filtered_words)

def get_prediction(text):
    encoding = new_tokenizer(text, return_tensors="pt", padding="max_length", truncation=True, max_length=128)
    encoding = {k: v.to(device) for k,v in encoding.items()}
    with torch.no_grad():
        outputs = new_model(**encoding)
    logits = outputs.logits
    sigmoid = torch.nn.Sigmoid()
    probs = sigmoid(logits.squeeze().cpu())
    probs = probs.detach().numpy()
    label = int(torch.argmax(logits, axis=-1))
    if label == 0:
        return {
            'category': 'food',
            'probability': float(probs[0])
        }
    elif label == 1:
        return {
            'category': 'travel',
            'probability': float(probs[1])
        }
    elif label == 2:
        return {
            'category': 'entertainment',
            'probability': float(probs[2])
        }

# Route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    # Extract important words from the image
    text_input = extract_important_words_from_image(image)

    # Get prediction using the extracted text
    prediction = get_prediction(text_input)
    return jsonify(prediction)

@app.route('/predict_text', methods=['POST'])
def predict_text():
   
    text = request.json['text']
    
    # Get prediction using the extracted text
    prediction = get_prediction(text)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)
