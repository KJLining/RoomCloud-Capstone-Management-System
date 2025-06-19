function FAQ() {
  const faqs = [
    {
      question: "What is the Capstone Management System?",
      answer:
        "The Capstone Management System (CMS) is an online platform designed to help students, advisers, and coordinators manage capstone project workflows from proposal to final submission."
    },
    {
      question: "Who can use the system?",
      answer:
        "The system is available to registered students, faculty advisers, panel members, and academic coordinators involved in the capstone program."
    },
    {
      question: "How do I submit a project proposal?",
      answer:
        "Once logged in as a student, go to the 'My Projects' section and click 'Submit Proposal'. Fill out the required fields and upload any supporting documents."
    },
    {
      question: "Can I edit a submitted proposal?",
      answer:
        "You can edit your proposal until it has been reviewed by your adviser or coordinator. After that, it will be locked for editing."
    },
    {
      question: "How will I know if my proposal is approved?",
      answer:
        "You will receive a notification in your dashboard once your adviser and coordinator have approved your proposal."
    },
    {
      question: "Who do I contact if I have technical issues?",
      answer:
        "If you experience any technical issues, please contact your academic coordinator or email the system support team at cms.support@university.edu."
    }
  ];

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Frequently Asked Questions (FAQ)</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse-${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
