
import QuoteForm from "../components/quote/QuoteForm";

export default function Quote() {
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#14B8A6]">
              B2B procurement
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-5xl">
              Request a quote
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
              Need medicines in bulk? Share your requirements with our team and
              receive a procurement quotation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase text-slate-900">
                  Bulk medicine pricing
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Share your expected quantities so pricing can be prepared for
                  your business requirements.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase text-slate-900">
                  Procurement support
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tell us about your medicine requirements, delivery schedule
                  and other procurement details.
                </p>
              </div>
            </div>
          </div>

          <QuoteForm kind="quote" />
        </div>
      </div>
    </div>
  );
}

