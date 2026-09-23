import ContactForm from "../components/contact/ContactForm";
export default function Contact() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      {" "}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        {" "}
        <ContactForm />{" "}
      </div>{" "}
    </main>
  );
}
