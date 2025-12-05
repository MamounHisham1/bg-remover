# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Background Remover web application built with Python Flask that uses the `rembg` library for AI-powered background removal from images. The application provides a professional web interface with drag-and-drop functionality and real-time image processing.

## Development Commands

### Environment Setup
```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Application
```bash
# Development server
python app.py

# Production server (if gunicorn is installed)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

The application runs on `http://localhost:5000` by default.

### Testing
There are currently no automated tests in this project. Manual testing can be done by:
1. Running the application
2. Uploading test images through the web interface
3. Verifying background removal functionality

## Architecture

### Core Components

- **app.py**: Main Flask application with all routes and business logic
- **templates/index.html**: Single-page application with Tailwind CSS and jQuery
- **static/js/main.js**: Frontend JavaScript handling file uploads, drag-and-drop, and UI interactions

### Key Dependencies

- **Flask**: Web framework
- **rembg**: AI background removal library (core functionality)
- **Pillow**: Image processing
- **gunicorn**: Production WSGI server (optional)

### Directory Structure

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
└── venv/              # Python virtual environment
```

### API Endpoints

- `GET /` - Main application page
- `POST /upload` - Upload and process image (returns JSON with processed filename)
- `GET /download/<filename>` - Download processed image
- `GET /preview/<filename>` - Preview processed image

### File Processing Flow

1. User uploads image via `/upload` endpoint
2. File is validated and saved temporarily in `uploads/` directory
3. `rembg.remove()` processes the image using AI
4. Processed image saved to `outputs/` directory with "removed_bg_" prefix
5. Temporary upload file is deleted
6. JSON response with success status and processed filename

### Configuration

- **File size limit**: 16MB
- **Supported formats**: PNG, JPG, JPEG, GIF, BMP, WebP
- **Output format**: PNG with transparent background
- **Auto-created directories**: `uploads/`, `outputs/`

## Development Notes

- The application uses CDN for frontend dependencies (Tailwind CSS, jQuery, Font Awesome)
- No database is used - all file operations are temporary
- Image processing happens synchronously in the request thread
- For production, consider using a background task queue for image processing
- The virtual environment is already set up with all dependencies installed
- File uploads are secured with filename sanitization and format validation

## Common Development Tasks

### Adding New Features
- Modify `app.py` for backend logic
- Update `templates/index.html` for UI changes
- Extend `static/js/main.js` for frontend interactions

### Debugging
- Run with `debug=True` in development for detailed error messages
- Check browser console for frontend JavaScript errors
- Monitor Flask server logs for backend issues

### Performance Considerations
- Large images may take several seconds to process
- Consider implementing progress indicators for better UX
- Production deployment should use gunicorn with multiple workers