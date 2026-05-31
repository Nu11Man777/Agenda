<p align="center">
    <h1 align="center">Agenda</h1>
</p>
<p align="center">
    <em>Personal activity management app with a Kanban board</em>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F.svg?style=flat&logo=SpringBoot&logoColor=white" alt="Spring Boot">
    <img src="https://img.shields.io/badge/Java%2021-ED8B00.svg?style=flat&logo=openjdk&logoColor=white" alt="Java">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=flat&logo=TailwindCSS&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Oracle%20XE-F80000.svg?style=flat&logo=Oracle&logoColor=white" alt="Oracle">
    <img src="https://img.shields.io/badge/JWT-000000.svg?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT">
    <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
    <img src="https://img.shields.io/badge/Gradle-02303A.svg?style=flat&logo=Gradle&logoColor=white" alt="Gradle">
</p>
<hr>

## 🚀 Getting Started

### Prerequisites

**Backend:**
- Java 21+
- Docker & Docker Compose
- Gradle (or use the included wrapper)

**Frontend:**
- Node.js 18+

---

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Nu11Man777/Agenda.git
cd Agenda/backend
```

2. Create your `.env` from the example:
```bash
cp .env.example .env
```
Edit `.env` and fill in your credentials (see `.env.example` for all required variables).

3. Start the Oracle XE database:
```bash
docker-compose up -d
```

4. Run the backend:
```bash
./gradlew bootRun
```

API available at `http://localhost:8080`

---

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Agenda/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create your `.env.local`:
```env
VITE_API_URL=http://localhost:8080
```

4. Start the dev server:
```bash
npm run dev
```

App available at `http://localhost:5173`

---

## 📸 Screenshots

### Authentication
<p align="center">
  <img src="imgs/Login.png" width="980" alt="Login"/>
</p>
<p align="center">
  <img src="imgs/Register.png" width="980" alt="Register"/>
</p>

### Kanban Board
<p align="center">
  <img src="imgs/Dashboard.png" width="980" alt="Dashboard"/>
</p>

---

## 🔒 Security testing

This repo includes small, opt-in mechanisms for controlled CI/CD security

---

## 🤟 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Nu11Man777">
        <img src="https://github.com/Nu11Man777.png" width="100px;" alt="Johann Trejo Flores"/><br />
        <sub><b>Johann Trejo Flores</b></sub>
      </a><br />
    </td>
  </tr>
</table>
