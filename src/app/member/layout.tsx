// src/app/member/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MemberBottomNavigation } from '@/components/layout/MemberBottomNavigation';
import Image from 'next/image';

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Debug logging
  useEffect(() => {
    console.log('Layout mounted, pathname:', pathname);
  }, [pathname]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/member',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z'
          />
        </svg>
      ),
    },
    {
      name: 'My Groups',
      href: '/member/groups',
      icon: (
        <svg
          className='w-5 h-5 sm:w-6 sm:h-6'
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
      ),
    },
    {
      name: 'Payments Summary',
      href: '/member/payments_summary',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      name: 'Profile',
      href: '/member/profile',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      ),
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 backdrop-blur-md bg-black/30 z-40 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Fixed positioning with higher z-index */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-xl border-r border-white/20 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center px-6 py-6 border-b border-white/20'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-black rounded-lg flex items-center justify-center '>
                <Image
                  src='/icons/app-icons/apple-icon-180x180.png'
                  alt='Logo'
                  width={32}
                  height={32}
                  priority
                  className='object-cover w-8 h-8 rounded-lg'
                />
              </div>
              <h1 className='text-xl font-bold text-gray-900'>
                Wallet7 Member
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-2'>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}>
                  {item.icon}
                  <span className='ml-3'>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className='p-4 border-t border-white/20'>
            <div className='flex items-center space-x-3 p-3 bg-blue-50 rounded-xl'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                <span className='text-white font-medium text-sm'>JD</span>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-gray-900 truncate'>John Doe</p>
                <p className='text-sm text-gray-600 truncate'>
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='lg:pl-64'>
        {/* Top Header */}
        <header className='bg-white/90 backdrop-blur-xl border-b border-white/20 px-4 py-4 lg:px-8 sticky top-0 z-30'>
          <div className='flex items-center justify-between'>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className='lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>

            <div className='flex items-center space-x-4'>
              {/* Notifications */}
              <button className='relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              </button>

              {/* Quick Actions */}
              <div className='hidden md:flex items-center space-x-2'>
                <button className='px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all duration-200'>
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content with bottom padding for mobile navigation */}
        <main className='p-4 lg:p-8 min-h-screen pb-20 lg:pb-8'>
          {children || (
            <div className='flex items-center justify-center min-h-[400px]'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Member Portal
                </h2>
                <p className='text-gray-600'>Welcome to your ROSCA dashboard</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MemberBottomNavigation />
    </div>
  );
}
