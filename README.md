
# Expense Categorization System Using Small Language Models (SLMs)

## Overview

This project leverages Small Language Models (SLMs) and natural language processing (NLP) techniques to automatically categorize expenses based on textual descriptions. The system is designed to streamline financial management processes by providing accurate and efficient categorization of expenses into predefined categories (e.g., travel, food, utilities, etc.).

The system includes:
- A **ReactJS** frontend for user interaction.
- A **Flask** backend for handling the model and serving predictions.
- **OCR integration** to extract text from uploaded images.
- **BERT model** fine-tuned for expense categorization.
  
## Project Structure

- **React-JS/**: Contains the frontend code, built using ReactJS. This folder includes components for the user interface, allowing users to upload receipts or manually enter expense descriptions.
  
- **ExpenseCategorization.ipynb**: Jupyter Notebook used for training the BERT model on a dataset of expense categories. The notebook includes steps for data preprocessing, model training, and evaluation.

- **dataset2.csv**: The dataset file containing expense descriptions and their corresponding categories. This is used to train the model.

- **model.py**: The Flask backend code. This file integrates the trained BERT model, handles incoming requests from the frontend, processes OCR-extracted or manually entered text, and returns the predicted expense category.

## Setup Instructions

### 1. Frontend (ReactJS)
To run the React frontend locally:
1. Navigate to the `React-JS/` directory.
2. Install the required dependencies:
   bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The frontend will be accessible at `http://localhost:3000`.

### 2. Backend (Flask)
To run the Flask backend:
1. Ensure you have Python and the required dependencies installed. You can install the dependencies listed in `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the Flask server:
   ```bash
   python model.py
   ```
3. The backend will be accessible at `http://localhost:5000`.

### 3. Model Training (Jupyter Notebook)
If you want to retrain the model:
1. Open the `ExpenseCategorization.ipynb` notebook in Jupyter.
2. Run the cells step by step to preprocess the dataset (`dataset2.csv`), train the model, and evaluate its performance.
3. Once trained, save the model for use in the Flask backend.

## Usage Instructions

1. **Upload Receipt or Enter Text**: 
   - Users can either upload an image of a receipt or manually input the expense description.
   
2. **OCR Processing**:
   - If an image is uploaded, OCR (Optical Character Recognition) is used to extract the text from the receipt image.

3. **Expense Categorization**:
   - The extracted or manually entered text is sent to the Flask backend, where it is processed by the fine-tuned BERT model to predict the appropriate expense category.

4. **View Results**:
   - The predicted expense category is displayed on the frontend. Users can confirm or edit the categorization if necessary.

## Requirements

- **Frontend**:
  - Node.js
  - React.js

- **Backend**:
  - Python 3.x
  - Flask
  - Hugging Face Transformers (for BERT integration)
  - Tesseract OCR (for text extraction from images)
  
- **Model Training**:
  - Jupyter Notebook
  - pandas, numpy (for data processing)
  - Hugging Face Transformers (for model fine-tuning)

## Future Enhancements

- Adding more granular categories for expenses.
- Expanding the dataset for more diverse expense descriptions.
- Implementing real-time feedback for incorrect categorization.
- Exploring additional lightweight models for faster inference.

## Contributing

Contributions are welcome! If you would like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request.

