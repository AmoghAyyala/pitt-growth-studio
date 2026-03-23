import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#1e293b_0%,#263244_30%,#334155_100%)] px-6 text-slate-100">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Payment Successful</h1>
        <p className="mt-4 text-lg leading-7 text-slate-300">
          Thank you for your payment! We will be in touch shortly to get your project started.
        </p>
        <p className="mt-2 text-slate-400">Check your email for a confirmation receipt from Stripe.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-orange-400 px-6 py-3 font-semibold text-white transition hover:opacity-95"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
