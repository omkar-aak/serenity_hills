export default function FAQ({ faqs }) {
  return (
    <div className="mx-auto max-w-4xl divide-y divide-forest/10 rounded-lg border border-forest/10 bg-white shadow-soft">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-5">
          <summary className="cursor-pointer list-none font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span className="text-xl text-clay transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 leading-7 text-stone-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
