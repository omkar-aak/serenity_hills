import { useState } from "react";
import { Database, Plus } from "lucide-react";
import { readHomeCms, writeHomeCms } from "../utils/homeCms";

const emptyVideo = { title: "", youtubeId: "", category: "Project", description: "" };
const emptyFaq = { question: "", answer: "" };
const emptyProperty = { title: "", type: "Plot", view: "", price: "", size: "" };
const emptyResponse = { trigger: "", answer: "" };

export default function HomeAdminPanel() {
  const [cms, setCms] = useState(readHomeCms);
  const [video, setVideo] = useState(emptyVideo);
  const [faq, setFaq] = useState(emptyFaq);
  const [property, setProperty] = useState(emptyProperty);
  const [response, setResponse] = useState(emptyResponse);

  function save(key, value, reset) {
    const next = { ...cms, [key]: [...(cms[key] || []), { ...value, id: `${key}-${Date.now()}` }] };
    setCms(next);
    writeHomeCms(next);
    reset();
  }

  return (
    <section className="home-admin" id="admin">
      <div className="home-container">
        <div className="home-admin-head">
          <div>
            <p className="home-eyebrow">Lightweight CMS</p>
            <h2>Update videos, FAQs, properties, leads, and bot knowledge.</h2>
          </div>
          <span><Database size={16} /> Local CMS, API-ready</span>
        </div>
        <div className="home-admin-grid">
          <AdminBox title="Add Video" values={video} setValues={setVideo} onSave={() => save("videos", video, () => setVideo(emptyVideo))} fields={["title", "youtubeId", "category", "description"]} />
          <AdminBox title="Add FAQ" values={faq} setValues={setFaq} onSave={() => save("faqs", faq, () => setFaq(emptyFaq))} fields={["question", "answer"]} />
          <AdminBox title="Add Property" values={property} setValues={setProperty} onSave={() => save("properties", property, () => setProperty(emptyProperty))} fields={["title", "type", "view", "price", "size"]} />
          <AdminBox title="Chatbot Response" values={response} setValues={setResponse} onSave={() => save("responses", response, () => setResponse(emptyResponse))} fields={["trigger", "answer"]} />
        </div>
      </div>
    </section>
  );
}

function AdminBox({ title, values, setValues, fields, onSave }) {
  const disabled = fields.some((field) => !String(values[field] || "").trim());
  return (
    <form className="home-admin-card" onSubmit={(event) => { event.preventDefault(); if (!disabled) onSave(); }}>
      <h3>{title}</h3>
      {fields.map((field) => (
        <label key={field}>
          <span>{field.replace(/([A-Z])/g, " $1")}</span>
          <input value={values[field] || ""} onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))} />
        </label>
      ))}
      <button type="submit" disabled={disabled}><Plus size={16} /> Save</button>
    </form>
  );
}
