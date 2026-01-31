import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- DATA PRESERVATION ---
const SYM_LIST = ['fever','high fever','chills','sweating','cough','productive cough','dry cough','sore throat','runny nose','congestion','sneezing','headache','severe headache','migraine-like pain','nausea','vomiting','diarrhea','abdominal pain','stomach cramps','loss of appetite','fatigue','weakness','dizziness','fainting','shortness of breath','chest pain','palpitations','rapid heartbeat','rash','itching','joint pain','muscle pain','back pain','ear pain','eye pain','blurred vision','loss of smell','loss of taste','urinary burning','frequent urination','blood in urine','bleeding gums','easy bruising','confusion','neck stiffness','difficulty swallowing','hoarseness','swelling'];

const DISEASES = [
  {id:'common_cold', name:'Common Cold', emoji:'🤧', symptoms:['sneezing','runny nose','sore throat','congestion','cough','headache','fatigue'], measures:['Rest & fluids','Warm drinks & honey for throat','Saline nasal drops','Paracetamol for fever/pain'], meds:['Paracetamol (OTC)','Antihistamines for runny nose']},
  {id:'influenza', name:'Influenza (Flu)', emoji:'🤒', symptoms:['fever','chills','cough','sore throat','muscle pain','fatigue','headache'], measures:['Rest & hydration','Consult doctor if high risk','Antivirals may help if within 48h'], meds:['Paracetamol','Antivirals by prescription']},
  {id:'covid19', name:'COVID-19', emoji:'🦠', symptoms:['fever','dry cough','fatigue','loss of smell','loss of taste','shortness of breath'], measures:['Isolate & test','Monitor oxygen','Seek care for breathing difficulty'], meds:['Supportive care; follow public health guidance']},
  {id:'pneumonia', name:'Pneumonia', emoji:'🏥', symptoms:['fever','productive cough','shortness of breath','chest pain','rapid breathing'], measures:['Seek medical evaluation','Chest X-ray & antibiotics if bacterial','Hospital care if severe'], meds:['Antibiotics if bacterial']},
  {id:'asthma', name:'Asthma (attack)', emoji:'💨', symptoms:['shortness of breath','wheezing','chest tightness','cough'], measures:['Use inhaler if prescribed','Sit upright & calm breathing','Seek urgent care if unresponsive'], meds:['Bronchodilators (inhaler)']},
  {id:'migraine', name:'Migraine', emoji:'🌩️', symptoms:['severe headache','nausea','light sensitivity','sound sensitivity','visual aura'], measures:['Rest in dark quiet room','Cold compress','Avoid triggers'], meds:['OTC analgesics; triptans if prescribed']},
  {id:'malaria', name:'Malaria', emoji:'🦟', symptoms:['fever','chills','sweating','headache','nausea'], measures:['Seek urgent medical testing','Do not self-medicate antimalarials without test'], meds:['Antimalarials by prescription']},
  {id:'dengue', name:'Dengue', emoji:'🩸', symptoms:['high fever','severe joint pain','rash','bleeding gums','easy bruising'], measures:['Avoid NSAIDs, use paracetamol','Seek medical attention quickly','Hydration & monitoring for bleeding'], meds:['Paracetamol only until dengue excluded']},
  {id:'typhoid', name:'Typhoid', emoji:'🧫', symptoms:['sustained fever','abdominal pain','diarrhea','constipation','headache'], measures:['See clinician for blood tests','Antibiotics if confirmed','Hydration & rest'], meds:['Antibiotics by prescription']},
  {id:'uti', name:'Urinary Tract Infection', emoji:'🚽', symptoms:['urinary burning','frequent urination','cloudy urine','lower abdominal pain'], measures:['Get urine test','Hydrate','Antibiotics if confirmed'], meds:['Antibiotics by prescription']},
  {id:'food_poisoning', name:'Food Poisoning', emoji:'🤢', symptoms:['nausea','vomiting','diarrhea','abdominal pain','dehydration'], measures:['Oral rehydration','Avoid solid food until vomiting subsides','Seek care if dehydrated'], meds:['ORS; antiemetic if advised']},
  {id:'allergy', name:'Allergic Rhinitis / Allergy', emoji:'🌼', symptoms:['sneezing','runny nose','itching','rash','eye irritation'], measures:['Avoid allergens','Antihistamines as advised','Nasal saline rinse'], meds:['Antihistamines (OTC)']},
  {id:'ear_infection', name:'Ear Infection', emoji:'👂', symptoms:['ear pain','fever','hearing difficulty','ear discharge'], measures:['See clinician','Avoid water in ear','Pain control & antibiotics if bacterial'], meds:['Analgesics; antibiotics if prescribed']},
  {id:'conjunctivitis', name:'Conjunctivitis', emoji:'👀', symptoms:['eye redness','itching','discharge','tearing'], measures:['Avoid touching eyes','Warm compress','Consult for bacterial vs viral'], meds:['Lubricant drops; antibiotics if bacterial']},
  {id:'dehydration', name:'Dehydration', emoji:'💧', symptoms:['dry mouth','decreased urination','dizziness','weakness','sunken eyes'], measures:['Oral rehydration','Seek IV fluids if severe'], meds:['ORS']},
  {id:'heatstroke', name:'Heatstroke / Heat Exhaustion', emoji:'🔥', symptoms:['high fever','weakness','confusion','excessive sweating or no sweating'], measures:['Move to cool place','Cool body with wet cloths','Seek urgent care if severe'], meds:['Medical supportive care']}
];

function App() {
  const [selected, setSelected] = useState([]);
  const [messages, setMessages] = useState([{ type: 'bot', text: '👋 Hello! Please select all the symptoms you are experiencing so we can identify the possible health issue.' }]);
  const [activeTab, setActiveTab] = useState('chat');
  const [results, setResults] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleSymptom = (s) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const analyze = async (sArray) => {
    setIsTyping(true);
    const RED = ['chest pain', 'shortness of breath', 'confusion', 'fainting', 'loss of consciousness', 'neck stiffness'];
    const redPresent = sArray.some(s => RED.includes(s));

    // Wait for "AI" feel
    await new Promise(r => setTimeout(r, 1000));

    const scored = DISEASES.map(d => {
      const matches = d.symptoms.filter(s => sArray.some(sel => sel.includes(s) || s.includes(sel)));
      let score = 0;
      for (const m of matches) {
        let w = 1;
        if (['shortness of breath', 'chest pain', 'high fever'].some(k => m.includes(k))) w = 2.4;
        score += w;
      }
      return { disease: d, matches, score: score / Math.max(d.symptoms.length, 1) };
    }).filter(x => x.matches.length > 0).sort((a, b) => b.score - a.score);

    setResults({ scored, redPresent });
    setIsTyping(false);
    setActiveTab('dash');
    setMessages(prev => [...prev, { type: 'bot', text: 'Analysis complete. Check the Results tab.' }]);
  };

  return (
    <div className="wrap">
      <header>
        <div className="brand">
          <div className="logo">🩺</div>
          <div>
            <div className="title"><h1>Dakthar</h1></div>
            <div className="tag">No injection, only suggestion</div>
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }} className="small"></div>
      </header>

      <aside className="panel">
        <h2>Symptoms</h2>
        <div className="symptoms">
          {SYM_LIST.map(s => (
            <div key={s} className={`symptom ${selected.includes(s) ? 'selected' : ''}`} onClick={() => toggleSymptom(s)}>
              <div className="emoji">🔹</div>
              <div>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button className="btn" onClick={() => setSelected([])}>Clear</button>
          <button className="btn primary" onClick={() => analyze(selected)}>Analyze</button>
        </div>
      </aside>

      <section className="content">
        <div className="tabs">
          <div className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>Chat</div>
          <div className={`tab ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>Results</div>
        </div>

        {activeTab === 'chat' ? (
          <div className="chat">
            <div className="messages">
              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.type} show`} dangerouslySetInnerHTML={{ __html: m.text }} />
              ))}
              {isTyping && <div className="typing">Analyzing...</div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <div className="dashboard">
            {!results ? <div className="small">No analysis yet.</div> : (
              <div className="result-card">
                {results.redPresent && <div style={{ background: 'red', color: 'white', padding: '10px', borderRadius: '8px' }}>⚠️ Emergency care recommended!</div>}
                {results.scored.slice(0, 4).map(res => (
                  <div key={res.disease.id} className="disease">
                    <div className="icon">{res.disease.emoji}</div>
                    <div>
                      <h4>{res.disease.name} (Match {Math.round(res.score * 100)}%)</h4>
                      <p className="small">Matched: {res.matches.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;