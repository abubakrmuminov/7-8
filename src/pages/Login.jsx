import { Form, NavLink, useActionData } from "react-router-dom";
import useLogin from "../hook/useLogin";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { FcGoogle } from "react-icons/fc";
import { FaAngleDoubleRight, FaGithub } from "react-icons/fa";
import { useResetPassword } from "../hook/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  return data
}

export default function Login() {
  const data = useActionData()
  const { login, isPending } = useLogin()
  const { resetPassword } = useResetPassword()
  const [form, setform] = useState(false)

  useEffect(() => {
    if (data?.email && data?.password) {
      login(data.email, data.password);
    } else {
      data ? formError() : false
    }

    if (data?.emailRecovery) {
      resetPassword(data.emailRecovery)
    }
  }, [data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {!form ? (
          <Form method="post" className="glass-effect rounded-3xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to continue to your account</p>
            </div>

            <div className="space-y-4 mb-6">
              <input 
                type="email" 
                placeholder="Email address" 
                name="email" 
                className="input-field"
              />
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                className="input-field"
              />
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            <div className="space-y-3 mb-6">
              <button 
                type="button"
                onClick={() => setform(!form)}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.414-6.414z" />
                </svg>
                <span>Forgot Password</span>
              </button>

              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <FaGithub size={20} />
                <span>Continue with Github</span>
              </button>
            </div>

            {!isPending ? (
              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <FaAngleDoubleRight size={16} />
              </button>
            ) : (
              <button className="w-full btn-primary opacity-50 cursor-not-allowed" disabled>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              </button>
            )}

            <div className="text-center mt-6">
              <span className="text-gray-400">Don't have an account? </span>
              <NavLink 
                to="/register" 
                className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
              >
                Sign up
              </NavLink>
            </div>
          </Form>
        ) : (
          <Form method="post" className="glass-effect rounded-3xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.414-6.414z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-gray-400">Enter your email to receive reset instructions</p>
            </div>

            <div className="space-y-4 mb-6">
              <input 
                type="email" 
                placeholder="Email address" 
                name="emailRecovery" 
                className="input-field"
              />
            </div>

            <div className="space-y-3">
              <button className="w-full btn-primary">
                Send Reset Link
              </button>
              
              <button 
                type="button"
                onClick={() => setform(!form)}
                className="w-full btn-secondary"
              >
                Back to Sign In
              </button>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}