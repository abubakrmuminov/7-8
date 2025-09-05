import { Form, NavLink, useActionData } from "react-router-dom";
import { useRegister } from "../hook/useRegister";
import { useEffect } from "react";
import { formError } from "../components/ErrorId";
import { FaAngleDoubleRight } from "react-icons/fa";

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    return data
}

export default function Register() {
    const data = useActionData()
    const { register, isPending } = useRegister()

    useEffect(() => {
        if (data?.name && data?.email && data?.password) {
            register(data.name, data.email, data.password);
        } else {
            data ? formError(data) : false
        }
    }, [data])

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Form method="post" className="glass-effect rounded-3xl p-8 animate-fade-in">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join us and start managing your tasks</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="Full name" 
                            name="name" 
                            className="input-field"
                        />
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

                    {!isPending ? (
                        <button className="w-full btn-primary flex items-center justify-center space-x-2 mb-6">
                            <span>Create Account</span>
                            <FaAngleDoubleRight size={16} />
                        </button>
                    ) : (
                        <button className="w-full btn-primary opacity-50 cursor-not-allowed mb-6" disabled>
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Creating account...</span>
                            </div>
                        </button>
                    )}

                    <div className="text-center">
                        <span className="text-gray-400">Already have an account? </span>
                        <NavLink 
                            to="/login" 
                            className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
                        >
                            Sign in
                        </NavLink>
                    </div>
                </Form>
            </div>
        </div>
    )
}