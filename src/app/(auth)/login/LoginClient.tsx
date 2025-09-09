'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginClient() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'member' as 'member' | 'organizer',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Login attempt:', formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect based on user type
      if (formData.userType === 'organizer') {
        window.location.href = '/admin/';
      } else {
        window.location.href = '/member/';
      }
    } catch (error) {
      setErrors({ password: 'Invalid credentials. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center'>
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='hidden lg:block space-y-8'>
          <div className='space-y-6'>
            <Link
              href='/'
              className='inline-flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>R</span>
              </div>
              <span className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                WALLET7
              </span>
            </Link>

            <div className='space-y-4'>
              <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                Welcome back to your{' '}
                <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  community
                </span>
              </h1>
              <p className='text-xl text-gray-600 leading-relaxed'>
                Continue managing your WALLET7 groups and track your savings
                journey with our comprehensive platform.
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/20 backdrop-blur-sm'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>Digital Tracking</p>
                <p className='text-sm text-gray-600'>
                  Complete transparency and records
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/20 backdrop-blur-sm'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <div>
                <p className='font-medium text-gray-900'>Community Focused</p>
                <p className='text-sm text-gray-600'>
                  Built for Indian communities
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-full max-w-md mx-auto lg:max-w-lg'>
          {/* Mobile Header */}
          <div className='lg:hidden text-center mb-8'>
            <Link
              href='/'
              className='inline-flex items-center space-x-2 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>R</span>
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                WALLET7
              </span>
            </Link>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Welcome Back
            </h2>
            <p className='text-gray-600'>
              Sign in to continue your WALLET7 journey
            </p>
          </div>

          <div className='bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8'>
            <div className='hidden lg:block mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Sign In</h2>
              <p className='text-gray-600'>Access your WALLET7 dashboard</p>
            </div>

            {/* User Type Selection */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                I am a
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  onClick={() => handleInputChange('userType', 'member')}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.userType === 'member'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}>
                  <div className='text-2xl mb-2'>👤</div>
                  <div className='font-medium'>Member</div>
                  <div className='text-xs opacity-75'>Join & participate</div>
                </button>
                <button
                  type='button'
                  onClick={() => handleInputChange('userType', 'organizer')}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    formData.userType === 'organizer'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}>
                  <div className='text-2xl mb-2'>👑</div>
                  <div className='font-medium'>Organizer</div>
                  <div className='text-xs opacity-75'>Create & manage</div>
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className='space-y-6'>
              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'border-red-300' : ''}`}
                    placeholder='Enter your email'
                    required
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className={`form-input pr-12 ${errors.password ? 'border-red-300' : ''}`}
                    placeholder='Enter your password'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    {showPassword ? (
                      <svg
                        className='h-5 w-5 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                        />
                      </svg>
                    ) : (
                      <svg
                        className='h-5 w-5 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleInputChange('rememberMe', e.target.checked)
                    }
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <span className='ml-2 text-sm text-gray-600'>
                    Remember me
                  </span>
                </label>
                <Link
                  href='/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-700 hover:underline'>
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='btn btn-primary w-full py-3 text-base relative'>
                {isLoading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    {formData.userType === 'organizer'
                      ? 'Access Dashboard'
                      : 'Join Groups'}
                    <svg
                      className='w-4 h-4 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                New to WALLET7?{' '}
                <Link
                  href='/register'
                  className='text-blue-600 hover:text-blue-700 font-medium hover:underline'>
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className='mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500'>
            <div className='flex items-center space-x-1'>
              <svg
                className='w-4 h-4'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span>Secure</span>
            </div>
            <div className='flex items-center space-x-1'>
              <span className='text-lg'>🇮🇳</span>
              <span>Made for India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
