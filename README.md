# 🩺 Dakthar
> **"No injection, only suggestion."**

Dakthar is a medical decision-support prototype that reimagines symptom checking through a weighted probabilistic matching engine. Dakthar calculates the statistical relevance of multiple conditions based on clinical symptom clusters, presenting results through an interactive, glassmorphism-inspired dashboard.

The project is built on the philosophy that medical symptoms are rarely isolated; they are overlapping indicators of underlying health states. Dakthar captures this complexity by evaluating user inputs against a multi-disease database, assigning dynamic weights to "Red Flag" symptoms, and providing immediate precautionary guidance.

**Live at:** https://saoodmasood1.github.io/Dakthar/ 

---

![Dakthar Dashboard](./public/images/screenshot.png)

---

## **Key Features**

- Distinguishes between "common" and "critical" symptoms to improve accuracy.
- Instant visual alerts when life-threatening symptoms (e.g., chest pain, confusion) are detected.
- A conversational Chat Mode for intuitive input and a Clinical Dashboard for detailed data visualization.
- Provides tailored self-care measures and medication suggestions for each potential condition.
- A distraction-free, professional aesthetic optimized for desktop and mobile medical use.

---

## **The Weighted Matching Model**

Dakthar evaluates inputs across a spectrum of acute and chronic conditions. The engine moves beyond simple keyword matching by using a multiplier-based scoring system:

- **Core Indicators:** Specific symptoms (e.g., "Loss of Taste" for COVID-19) are assigned higher weights
- **Systemic Indicators:** Overlapping symptoms (e.g., "Fever" or "Fatigue") contribute to the broader probability score.
- **Emergency Weights:** Symptoms identified as "Red Flags" trigger an immediate triage override regardless of the overall percentage match.

This approach ensures that critical conditions are never "diluted" by a high number of minor symptoms.

---

## **How the Engine Works**

The analysis logic is encapsulated within the analyze function in App.jsx, ensuring a separation between the user interface and the diagnostic algorithm.

- **Normalization:** The system scans the user's selected symptoms against the disease database.
- **Weighted Scoring:** It calculates a match score by dividing the weighted sum of matched symptoms by the total profile requirements of the disease.
- **Triage Check:** A secondary loop checks for life-threatening "Red Flag" keywords.
- **Priority Sorting:** Results are sorted in descending order of probability to focus user attention on the most likely outcomes.

---

## **Project Structure**

Dakthar/
│── src/
│   ├── App.jsx        
│   ├── App.css        
│   └── main.jsx       
├── public/            
└── vite.config.js     

---

## **Limitations & Future Improvements**

**Current Limitations:** 
- Analysis is rule-based and depends on the accuracy of the predefined symptom database.
- The algorithm cannot currently account for patient history or pre-existing conditions.

**Potential Enhancements:** 
- Allowing users to download a summary of their analysis to show to a doctor.
- Integration of Web Speech API for hands-free symptom reporting.
- Incorporating a wider range of rare and specialized conditions.

---

## **Installation and Local Setup**
To get a local copy up and running, follow these simple steps:

1. Clone the repository:
```bash
git clone https://github.com/saoodmasood1/Dakthar.git
cd Dakthar
```

2. Install dependencies:

```bash
npm install
```

3. Run the Application:

```bash
npm run dev
```


## **Final Note**
Dakthar represents a transition from simple data entry to intelligent data interpretation. It integrates algorithmic weighting, modern frontend design, and triage logic into a cohesive product centered on health awareness and emergency preparedness.