# AI Background Remover

A professional web application for removing backgrounds from images using advanced AI technology. Built with Python Flask backend and modern frontend using Tailwind CSS and jQuery.

## Features

- **AI-Powered Background Removal**: Uses the `rembg` library with state-of-the-art deep learning models
- **Professional UI**: Clean, modern interface built with Tailwind CSS
- **Drag & Drop Support**: Easy file upload with drag and drop functionality
- **Multiple Format Support**: PNG, JPG, JPEG, GIF, BMP, WebP
- **Instant Preview**: See original and processed images side by side
- **Secure File Handling**: Proper file validation and secure uploads
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clipboard Support**: Paste images directly from clipboard

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

### 3. Open Your Browser

Navigate to `http://localhost:5000` to start using the application.

## Requirements

- Python 3.7+
- Internet connection (for Tailwind CSS and jQuery CDN)

## Project Structure

```
bg-removal/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html     # Main HTML template
├── static/
│   └── js/
│       └── main.js    # Frontend JavaScript
├── uploads/           # Temporary upload directory (auto-created)
├── outputs/           # Processed images directory (auto-created)
└── README.md          # This file
```

## How It Works

1. **Upload**: Select or drag-drop an image file
2. **AI Processing**: Advanced AI model removes the background
3. **Download**: Get your processed image with transparent background

## Technologies Used

- **Backend**: Python Flask
- **AI Processing**: rembg (Remove Background)
- **Frontend**: HTML5, Tailwind CSS, jQuery
- **Image Processing**: Pillow (PIL)
- **File Handling**: Werkzeug

## API Endpoints

- `GET /` - Main application page
- `POST /upload` - Upload and process image
- `GET /download/<filename>` - Download processed image
- `GET /preview/<filename>` - Preview processed image

## Configuration

The application automatically creates necessary directories and handles file management. Default settings:

- Maximum file size: 16MB
- Supported formats: PNG, JPG, JPEG, GIF, BMP, WebP
- Server: Flask development server (use gunicorn for production)

## Production Deployment

For production deployment, use a WSGI server like Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## License

This project is open source and available under the MIT License. 