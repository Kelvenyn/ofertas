"use client"

import { useState } from "react"
import { OFFER } from "@/config/offer"

export function FAQ() {
  const { title, items: faqItems } = OFFER.faq
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqItems || faqItems.length === 0) return null

  return (
    <div className="faq-acc-wrap">
      <div className="faq-acc-inner">
        <h2 className="faq-acc-title">{title}</h2>

        <div className="faq-acc-list" role="list">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            const btnId = `faq-btn-${i}`
            return (
              <div
                className={`faq-acc-item${isOpen ? " open" : ""}`}
                key={i}
                role="listitem"
              >
                <button
                  id={btnId}
                  className="faq-acc-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-acc-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-acc-panel"
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
