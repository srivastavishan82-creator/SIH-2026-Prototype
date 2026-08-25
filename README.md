# 🏛️ Land Record Digitization System - SIH 2026

**An AI-powered platform for digitizing, validating, and managing Indian land records with OCR, NLP, and human-in-the-loop verification.**

![Python](https://img.shields.io/badge/Python-3.11%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.12-red)
![PaddleOCR](https://img.shields.io/badge/PaddleOCR-2.7-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

---

## 📋 Problem Statement

Smart India Hackathon 2026 - Land Record Digitization and Validation System

Land records form the backbone of land administration, property ownership, taxation, land acquisition, dispute resolution, and infrastructure planning. Across India, a significant portion of historical land records continues to exist in the form of handwritten registers, scanned documents, maps, cadastral records, and legacy PDF files maintained at various administrative levels.

**Key Challenges:**
- Poor image quality, inconsistent formats, faded text, damaged pages
- Multiple regional languages and handwritten annotations
- Time-consuming and error-prone manual digitization
- Lack of standardized digital land records
- No seamless integration with modern land information systems

---

## ✨ Features

### 1. 📤 Document Intake
- Upload scanned images, handwritten registers, PDFs, and cadastral maps
- Multi-language support: Hindi, English, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, and more
- Drag-and-drop interface with progress tracking

### 2. 🔍 OCR + Layout Understanding
- **PaddleOCR** for printed and handwritten text recognition
- Handles poor quality, faded ink, and torn pages
- Layout detection for forms, tables, and key-value pairs
- Multi-language Indic script support

### 3. 📊 Structured Extraction
Automatically extracts and classifies:
- Landowner name, father's/husband's name
- Survey number, Khasra number, Khata number
- Plot area with unit conversion (acres, hectares, bigha)
- Village, Tehsil, District, State
- Land classification (agricultural, residential, commercial)
- Mutation records and registration information

### 4. ✅ Validation & Confidence Scoring
- Rule-based validation (numeric checks, format validation)
- Duplicate detection
- Confidence score for each extracted field
- Logical consistency checks

### 5. 👥 Human Verification Workflow
- Low-confidence records automatically routed to reviewers
- Manual correction interface with real-time updates
- Complete audit trail: who changed what and when
- Role-based access control (admin, verifier, citizen, govt official)

### 6. 📈 Analytics Dashboard
- Documents processed count
- Extraction accuracy metrics
- Pending verification cases
- Error statistics
- District-wise and state-wise progress tracking

### 7. 🔗 System Integration
- APIs for LRMS (Land Records Management Systems)
- DILRMP (Digital India Land Records Modernization Programme) integration
- GIS platform connectivity with PostGIS
- Cadastral map visualization

### 8. 🧠 AI Improvement Loop
- Human corrections stored for model retraining
- Continuous accuracy improvement over time
- Feedback mechanism for OCR model fine-tuning

---

## 🛠️ Tech Stack

### Backend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | FastAPI (Python 3.11+) | High-performance API with async support |
| **OCR Engine** | PaddleOCR | Printed + handwritten Indic text recognition |
| **Layout Detection** | LayoutParser / PPStructure | Form and table detection |
| **NLP** | IndicBERT / MuRIL / XLM-R | Language detection and entity mapping |
| **Database** | PostgreSQL + PostGIS | Structured data + GIS support |
| **Task Queue** | Celery + Redis | Async OCR processing |
| **Authentication** | JWT / OAuth 2.0 + API key auth | Role-based access and programmatic access |
| **File Storage** | Local filesystem / MinIO | Document storage |
| **Monitoring** | Prometheus + Grafana | Metrics and analytics |

### Frontend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18 | Component-based UI |
| **UI Library** | Ant Design 5 | Pre-built components and dashboards |
| **Charts** | Recharts | Analytics visualizations |
| **Routing** | React Router 6 | Navigation |
| **Build Tool** | Vite 5 | Fast development and building |
| **HTTP Client** | Axios | API communication |

---

## 📁 Project Structure

```
SIH 2026/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── database.py             # PostgreSQL connection setup
│   │   ├── auth.py                 # JWT authentication utilities
│   │   ├── api_key_auth.py         # API key authentication
│   │   ├── models.py               # SQLAlchemy ORM models
│   │   ├── schemas.py              # Pydantic request/response schemas
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py             # Authentication endpoints
│   │   │   ├── api_keys.py         # API key management
│   │   │   ├── documents.py        # Document CRUD operations
│   │   │   ├── ocr.py              # OCR processing endpoints
│   │   │   ├── validation.py       # Field validation endpoints
│   │   │   ├── verification.py     # Human verification endpoints
│   │   │   ├── analytics.py        # Dashboard statistics
│   │   │   └── integrations.py     # LRMS/GIS integration
│   │   ├── ocr/                    # PaddleOCR wrapper
│   │   │   └── __init__.py
│   │   ├── nlp/                    # NLP utilities
│   │   │   └── __init__.py
│   │   └── validation/             # Validation rules
│   │       └── __init__.py
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Backend container config
│   ├── package.json                # Backend metadata
│   └── .env.example                # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── main.jsx                # React entry point
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── index.css               # Global styles
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Admin analytics dashboard
│   │   │   ├── UploadDocument.jsx  # Document upload interface
│   │   │   ├── VerificationQueue.jsx # Human verification UI
│   │   │   ├── DocumentDetails.jsx # Extracted fields view
│   │   │   ├── Analytics.jsx       # Charts and statistics
│   │   │   └── Integrations.jsx    # LRMS/GIS integration
│   │   ├── components/             # Reusable components
│   │   ├── services/               # API client services
│   │   └── utils/                  # Helper functions
│   ├── public/
│   │   └── vite.svg
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── Dockerfile                  # Frontend container config
│   └── index.html                  # HTML template
├── docker-compose.yml              # Multi-service orchestration
├── docs/
│   └── sample_documents/           # Sample land record images
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 18+** and npm
- **Docker Desktop** (for PostgreSQL, Redis, and containers)
- **Git**

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/srivastavishan82-creator/SIH-2026-Prototype.git
cd SIH-2026-Prototype

# Start all services
docker-compose up

# Access the application:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations (if using Alembic)
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Database Setup
```bash
# Start PostgreSQL and Redis with Docker
docker-compose up db redis -d

# Or install locally:
# PostgreSQL: https://www.postgresql.org/download/
# Redis: https://redis.io/download
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info

### Documents
- `POST /api/v1/documents/upload` - Upload land record document
- `GET /api/v1/documents` - List all documents
- `GET /api/v1/documents/{id}` - Get document details
- `POST /api/v1/documents/{id}/process` - Trigger OCR processing

### OCR
- `POST /api/v1/ocr/process` - Run OCR on image/PDF
- `POST /api/v1/ocr/extract-fields` - Extract structured fields

### Validation
- `POST /api/v1/validation/validate` - Validate extracted fields
- `POST /api/v1/validation/confidence` - Compute confidence scores

### Verification
- `POST /api/v1/verification/verify/{field_id}` - Verify/correct field
- `GET /api/v1/verification/pending` - Get pending verifications

### Analytics
- `GET /api/v1/analytics/stats` - Dashboard statistics
- `GET /api/v1/analytics/district-progress` - District-wise progress

### Integrations
- `POST /api/v1/integrations/lrms` - Sync with LRMS
- `GET /api/v1/integrations/gis/parcel/{survey_no}` - Fetch GIS data

### API Keys
- `POST /api/v1/api-keys/` - Create API key
- `GET /api/v1/api-keys/` - List API keys
- `DELETE /api/v1/api-keys/{id}` - Revoke API key

### API Key Usage
Send requests with header: `X-API-Key: lrds_<your-api-key>`

**Full interactive API documentation available at:** `http://localhost:8000/docs`

---

## 🔐 API Key Access

Programmatic access is supported via scoped API keys.

### Create an API Key
```bash
curl -X POST "http://localhost:8000/api/v1/api-keys/" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-integration-key"}'
```

### Use an API Key
```bash
curl -H "X-API-Key: lrds_<your-api-key>" http://localhost:8000/api/v1/protected-doc
```

### Manage Keys
- List keys: `GET /api/v1/api-keys/`
- Revoke key: `DELETE /api/v1/api-keys/{id}`

---

## 🎨 Frontend Pages

### Dashboard
- Overview statistics (total documents, processed, pending, accuracy)
- Processing progress and confidence distribution
- Recent documents table with status

### Upload Document
- Drag-and-drop file upload
- Support for PDF, JPG, PNG formats
- Multi-language document acceptance
- Real-time upload progress

### Verification Queue
- Low-confidence extractions list
- One-click verification workflow
- Confidence score visualization
- Edit and correct fields

### Document Details
- View all extracted fields for a document
- Inline editing of field values
- Confidence score per field
- Export to JSON

### Analytics
- District-wise processing bar chart
- Accuracy distribution pie chart
- Error statistics
- Processing trends

### Integrations
- LRMS/DILRMP sync interface
- GIS parcel data viewer
- Mock government system integration
- API connection testing

---

## 🔧 Configuration

### Environment Variables (Backend)

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://landuser:***@localhost:5432/landrecords

# Redis
REDIS_URL=redis://localhost:6379/0

# Authentication
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Upload
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE_MB=10
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/

# Frontend tests
cd frontend
npm test
```

---

## 📦 Deployment

### Production Docker Compose

```bash
# Use production override
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment Setup
1. Set strong `SECRET_KEY` in production
2. Use PostgreSQL with proper backups
3. Configure Redis for production
4. Set up SSL/TLS certificates
5. Configure CORS origins
6. Enable Prometheus + Grafana monitoring

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Sample Data

Sample land record documents are available in `docs/sample_documents/`. These include:
- Scanned handwritten registers (Hindi/English)
- Printed property registration PDFs
- Cadastral map images
- Mutation record samples

---

## 🏆 Hackathon Judging Criteria

✅ **Working end-to-end demo** - Full pipeline from upload to structured data  
✅ **Multilingual support** - Handles multiple Indian languages  
✅ **Confidence scoring** - Per-field confidence metrics  
✅ **Human verification workflow** - Low-confidence field routing  
✅ **Audit trail** - Complete change history with timestamps  
✅ **Analytics dashboard** - Real-time statistics and charts  
✅ **Real-world problem framing** - Addresses actual government digitization needs  

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built for **Smart India Hackathon 2026**

---

## 📞 Contact

For queries and support, please open an issue in the GitHub repository.

---

## 🙏 Acknowledgments

- **PaddleOCR** - Indic language OCR engine
- **Ant Design** - React UI component library
- **FastAPI** - Modern Python web framework
- **Smart India Hackathon** - Platform for innovation

---

**⭐ Star this repository if you find it helpful!**

**🍴 Fork it to create your own land record digitization system!**
