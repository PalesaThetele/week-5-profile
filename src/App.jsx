
import { useState } from "react";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "",
  acceptedTerms: false,
};

function App() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Please choose an account type.";
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "Please accept the terms to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    // Demo submission: no account is created or data sent to a server.
    window.setTimeout(() => {
      setStatus("success");
    }, 700);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-todo-background px-4 py-10 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-todo-turquoise-light sm:-left-20 sm:-top-28 sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 -top-36 h-64 w-64 rounded-full bg-todo-turquoise opacity-35 sm:-left-10 sm:-top-40 sm:h-80 sm:w-80"
      />

      <section className="relative z-10 w-full max-w-[520px] rounded-[28px] bg-white/70 px-6 py-10 shadow-sm sm:px-12 sm:py-14">
        <header className="mb-9 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-todo-turquoise">
            Todo Application
          </p>
          <h1 className="text-2xl font-bold tracking-wide text-todo-text sm:text-3xl">
            Welcome Onboard!
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Let’s help you meet up your tasks
          </p>
        </header>

        {status === "success" ? (
          <div
            role="status"
            className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center"
          >
            <h2 className="text-xl font-semibold text-teal-800">
              Registration successful!
            </h2>
            <p className="mt-2 text-sm text-teal-700">
              Welcome, {formData.fullName}. Your demo registration is complete.
            </p>
            <button
              type="button"
              onClick={() => {
                setFormData(initialValues);
                setErrors({});
                setStatus("idle");
              }}
              className="mt-5 rounded-full bg-todo-turquoise px-6 py-3 font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-todo-turquoise focus:ring-offset-2"
            >
              Register another account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={`w-full rounded-input border bg-white px-6 py-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-todo-turquoise focus:ring-2 focus:ring-todo-turquoise/20 ${
                    errors.fullName ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 px-4 text-xs text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full rounded-input border bg-white px-6 py-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-todo-turquoise focus:ring-2 focus:ring-todo-turquoise/20 ${
                    errors.email ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 px-4 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter password (8+ characters)"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full rounded-input border bg-white px-6 py-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-todo-turquoise focus:ring-2 focus:ring-todo-turquoise/20 ${
                    errors.password ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.password && (
                  <p id="password-error" className="mt-2 px-4 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  className={`w-full rounded-input border bg-white px-6 py-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-todo-turquoise focus:ring-2 focus:ring-todo-turquoise/20 ${
                    errors.confirmPassword ? "border-red-500" : "border-transparent"
                  }`}
                />
                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    className="mt-2 px-4 text-xs text-red-600"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="accountType"
                className="mb-2 block px-2 text-sm font-medium text-gray-600"
              >
                Account type
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                aria-invalid={Boolean(errors.accountType)}
                aria-describedby={errors.accountType ? "accountType-error" : undefined}
                className={`w-full rounded-xl border bg-white px-5 py-3 text-sm text-gray-700 outline-none focus:border-todo-turquoise focus:ring-2 focus:ring-todo-turquoise/20 ${
                  errors.accountType ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Choose account type</option>
                <option value="personal">Personal</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
              {errors.accountType && (
                <p id="accountType-error" className="mt-2 px-2 text-xs text-red-600">
                  {errors.accountType}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label className="flex items-start gap-3 px-1 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.acceptedTerms)}
                  className="mt-1 h-4 w-4 accent-[#51BEC5] focus:ring-todo-turquoise"
                />
                <span>
                  I agree to the terms and conditions.
                  {errors.acceptedTerms && (
                    <span className="mt-1 block text-xs text-red-600">
                      {errors.acceptedTerms}
                    </span>
                  )}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-9 w-full bg-todo-turquoise px-6 py-4 text-base font-semibold tracking-wide text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-todo-turquoise focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 sm:text-lg"
            >
              {status === "submitting" ? "Registering..." : "Register"}
            </button>

            {status === "error" && (
              <p role="alert" className="mt-3 text-center text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-7 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  alert("This demo implements the registration screen only.")
                }
                className="font-semibold text-todo-turquoise hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}

export default App;
