// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import TranslationDebug from '@/components/debug/TranslationDebug';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Admin Features */}
      <AdminFeaturesSection />

      {/* Member Features */}
      <MemberFeaturesSection />

      {/* India-Specific Features */}
      <IndiaFeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />

      {/* Debug Component - Remove in production
      <TranslationDebug /> */}
    </div>
  );
}

function Navigation() {
  const { t } = useTranslation('landing');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-white/20 z-50'>
      <div className='container-responsive py-3'>
        {/* Layout: column on mobile, row from md+ */}
        <div className='flex flex-col md:flex-row items-center justify-between'>
          {/* Logo and Brand Name */}
          <div className='flex items-center space-x-2 mb-3 md:mb-0'>
            <div className='w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center'>
              <Image
                src='/icons/app-icons/apple-icon-180x180.png'
                alt='Logo'
                width={32}
                height={32}
                priority
                className='object-cover w-8 h-8'
              />
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              WALLET7
            </span>
          </div>
          {/* Navigation Links */}
          <div className='hidden md:flex flex-row items-center space-x-8 mb-0'>
            <a
              href='#features'
              className='text-gray-600 hover:text-blue-600 transition-colors'>
              {t('navigation.features')}
            </a>
            <a
              href='#admin-features'
              className='text-gray-600 hover:text-blue-600 transition-colors'>
              {t('navigation.forOrganizers')}
            </a>
            <a
              href='#member-features'
              className='text-gray-600 hover:text-blue-600 transition-colors'>
              {t('navigation.forMembers')}
            </a>
            <a
              href='#india-features'
              className='text-gray-600 hover:text-blue-600 transition-colors'>
              {t('navigation.indiaSpecific')}
            </a>
          </div>
          {/* Language switch/login/register */}
          <div className='flex items-center space-x-3'>
            <LanguageSwitcher
              className='mr-2'
              variant='toggle'
            />
            <Link
              href='/login'
              className='text-gray-600 hover:text-blue-600 transition-colors'>
              {t('navigation.login')}
            </Link>
            <Link
              href='/register'
              className='btn btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all'>
              {t('navigation.getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useTranslation('landing');

  return (
    <section className='pt-32 pb-20 overflow-hidden'>
      <div className='container-responsive'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='space-y-8'>
            <div className='space-y-4'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200'>
                <span className='text-green-600 text-sm font-medium'>
                  {t('hero.tagline')}
                </span>
              </div>

              <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                {t('hero.title')}
              </h1>

              <p className='text-xl text-gray-600 leading-relaxed max-w-lg'>
                {t('hero.subtitle')}
              </p>

              {/* Key Value Props */}
              <div className='grid grid-cols-2 gap-4 pt-4'>
                <div className='flex items-center space-x-2 text-sm'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-gray-700'>
                    {t('hero.features.communityManaged')}
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-sm'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <span className='text-gray-700'>
                    {t('hero.features.digitalTracking')}
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-sm'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                  <span className='text-gray-700'>
                    {t('hero.features.multiLanguage')}
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-sm'>
                  <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                  <span className='text-gray-700'>
                    {t('hero.features.offlineReady')}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/register?type=admin'
                className='btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all'>
                {t('hero.buttons.startAsOrganizer')}
                <svg
                  className='w-5 h-5 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>

              <Link
                href='/register?type=member'
                className='btn btn-secondary text-lg px-8 py-4 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all'>
                {t('hero.buttons.joinAsMember')}
              </Link>
            </div>

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <p className='text-sm text-blue-800'>
                <strong>{t('hero.notice.title')}</strong>{' '}
                {t('hero.notice.description')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'>
            <div className='relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-white/80'>
                    {t('hero.demo.monthlyContribution')}
                  </span>
                  <span className='text-white font-bold text-lg'>₹5,000</span>
                </div>
                <div className='progress-bar bg-white/20'>
                  <motion.div
                    className='progress-fill bg-white'
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
                <div className='text-white/80 text-sm'>
                  {t('hero.demo.roundInfo')}
                </div>
              </div>

              <div className='absolute -top-4 -right-4 w-20 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg'>
                <span className='text-xs font-bold text-green-900'>
                  {t('hero.demo.liveStatus')}
                </span>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className='absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100'>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                <span className='text-sm font-medium text-blue-600'>
                  {t('hero.demo.paymentRecorded')}
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className='absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100'>
              <div className='text-center'>
                <div className='text-lg font-bold text-blue-600'>₹60,000</div>
                <div className='text-xs text-gray-600'>
                  {t('hero.demo.availablePayout')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: '📊',
      title: 'Group Management',
      description:
        'Create and manage Wallet7 groups with customizable rules, member tracking, and automated scheduling.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: '🔍',
      title: 'Payment Tracking',
      description:
        'Track member contributions manually with clear payment status and comprehensive history records.',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: '📱',
      title: 'Digital Organization',
      description:
        'Modern interface designed for ease of use, with clean navigation and intuitive controls.',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: '📈',
      title: 'Reports & Analytics',
      description:
        'Generate detailed reports, export payment histories, and maintain complete transparency for all members.',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: '🌐',
      title: 'Offline Capability',
      description:
        "Work without internet connection. All data syncs automatically when you're back online.",
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description:
        'Automated reminders for payments and payout schedules keep everyone informed and on track.',
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section
      id='features'
      className='py-20 bg-white'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Everything you need for{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              successful Wallet7s
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Comprehensive tools to organize, track, and manage rotating savings
            and credit associations with complete transparency and efficiency.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group'>
              <div className='card card-hover h-full'>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Create Your Wallet7',
      description:
        'Set up a new savings group with custom terms, contribution amounts, payout schedule, and member limits.',
      icon: '👥',
    },
    {
      step: '02',
      title: 'Invite Members',
      description:
        'Add trusted friends, family, or community members to your Wallet7 group using invite codes or approval system.',
      icon: '📧',
    },
    {
      step: '03',
      title: 'Track Contributions',
      description:
        'Members make offline payments. Organizers mark payments as received to maintain accurate digital records.',
      icon: '📝',
    },
    {
      step: '04',
      title: 'Manage Payouts',
      description:
        'Track payout schedules, receive notifications, and ensure smooth distribution according to group rules.',
      icon: '💰',
    },
  ];

  return (
    <section
      id='how-it-works'
      className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            How{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Wallet7
            </span>{' '}
            Works
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Simple and transparent process to organize your community savings
            group with digital tracking and management.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className='flex items-start space-x-6'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg'>
                    {step.icon}
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center space-x-3 mb-2'>
                    <span className='text-blue-600 font-bold text-lg'>
                      Step {step.step}
                    </span>
                    <div className='h-px bg-blue-200 flex-1'></div>
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div>
            <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100'>
              <div className='text-center mb-6'>
                <h4 className='text-2xl font-bold text-gray-900 mb-2'>
                  Example WALLET7 Group
                </h4>
                <p className='text-gray-600'>
                  12 Members • ₹5,000/month • 12 cycles
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex justify-between items-center p-4 bg-blue-50 rounded-xl'>
                  <span className='font-medium'>Monthly Pool Amount</span>
                  <span className='text-xl font-bold text-blue-600'>
                    ₹60,000
                  </span>
                </div>

                <div className='grid grid-cols-3 gap-3'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((member) => (
                    <div
                      key={member}
                      className={`p-3 rounded-lg text-center text-sm font-medium ${
                        member <= 8
                          ? 'bg-green-100 text-green-700'
                          : member === 9
                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                      {member <= 8 ? '✓' : member === 9 ? 'NEXT' : member}
                    </div>
                  ))}
                </div>

                <div className='text-center text-sm text-gray-600 pt-4'>
                  <span className='inline-flex items-center space-x-2'>
                    <span className='w-3 h-3 bg-green-400 rounded-full'></span>
                    <span>Received Payout</span>
                  </span>
                  <span className='inline-flex items-center space-x-2 ml-4'>
                    <span className='w-3 h-3 bg-blue-400 rounded-full'></span>
                    <span>Next Turn</span>
                  </span>
                  <span className='inline-flex items-center space-x-2 ml-4'>
                    <span className='w-3 h-3 bg-gray-400 rounded-full'></span>
                    <span>Waiting</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Admin Features Section
function AdminFeaturesSection() {
  const adminFeatures = [
    {
      icon: '📈',
      title: 'Dashboard Overview',
      description:
        'Get a complete view of all your WALLET7 groups, member activities, and upcoming payouts.',
    },
    {
      icon: '👥',
      title: 'Member Management',
      description:
        'Add, approve, and manage members across multiple WALLET7 groups with detailed member profiles.',
    },
    {
      icon: '📅',
      title: 'Payout Scheduling',
      description:
        'Visual calendar showing payout schedules with automated notifications and reminders.',
    },
    {
      icon: '✅',
      title: 'Payment Records',
      description:
        'Mark member contributions as paid or pending based on offline transactions received.',
    },
    {
      icon: '🔔',
      title: 'Reminder System',
      description:
        'Send automated payment reminders via email and in-app notifications to keep groups on track.',
    },
    {
      icon: '📊',
      title: 'Reports & Export',
      description:
        'Generate comprehensive reports and export payment histories for complete transparency.',
    },
  ];

  return (
    <section
      id='admin-features'
      className='py-20 bg-white'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            For{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Group Organizers
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Powerful tools to create, manage, and track multiple WALLET7 groups
            with ease and transparency.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group'>
              <div className='card card-hover h-full'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Member Features Section
function MemberFeaturesSection() {
  const memberFeatures = [
    {
      icon: '🏠',
      title: 'Personal Dashboard',
      description:
        'Track all your WALLET7 participations, payment due dates, and payout schedules in one place.',
    },
    {
      icon: '📱',
      title: 'Group Overview',
      description:
        "View details of all groups you've joined with current status and contribution information.",
    },
    {
      icon: '📈',
      title: 'Payout Timeline',
      description:
        'Visual timeline showing your position in the payout queue and expected receipt dates.',
    },
    {
      icon: '📋',
      title: 'Payment History',
      description:
        'Complete record of all your contributions as recorded and verified by group organizers.',
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description:
        'Get timely reminders for upcoming payments and alerts when your payout turn approaches.',
    },
    {
      icon: '💬',
      title: 'Group Chat',
      description:
        'Communicate with group members and organizers to stay connected and informed.',
    },
  ];

  return (
    <section
      id='member-features'
      className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            For{' '}
            <span className='bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>
              Members
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Simple and transparent tools for members to track their
            participation and stay informed.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {memberFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group'>
              <div className='card card-hover h-full'>
                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// India-Specific Features Section
function IndiaFeaturesSection() {
  const indiaFeatures = [
    {
      icon: '🌏',
      title: 'Multi-Language Support',
      description:
        'Available in Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali, and more.',
    },
    {
      icon: '📱',
      title: 'Offline Mode',
      description:
        "Work without internet. Data automatically syncs when you're back online for uninterrupted access.",
    },
    {
      icon: '💬',
      title: 'Enhanced Communication',
      description:
        'Broadcast messages, polls for group decisions, and direct messaging between members and organizers.',
    },
    {
      icon: '🧮',
      title: 'Automated Calculations',
      description:
        'Automatic calculation of member contributions, payouts, and group financial summaries.',
    },
    {
      icon: '⚖️',
      title: 'Dispute Resolution',
      description:
        'Built-in system for members to raise concerns and organizers to track and resolve issues.',
    },
    {
      icon: '📚',
      title: 'Educational Resources',
      description:
        'In-app guides, FAQs, and tutorials about WALLET7 operations and best practices.',
    },
  ];

  return (
    <section
      id='india-features'
      className='py-20 bg-white'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Built for{' '}
            <span className='bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
              India
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Specially designed features that address the unique needs of Indian
            communities and diverse regional requirements.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {indiaFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group'>
              <div className='card card-hover h-full'>
                <div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className='py-20'>
      <div className='container-responsive'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden'>
          <div className='relative z-10'>
            <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
              Ready to start your{' '}
              <span className='text-yellow-400'>WALLET7 journey</span>?
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Join thousands who are already organizing their community savings
              groups with our platform. Create your first WALLET7 in minutes.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/register?type=admin'
                className='btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 shadow-xl transform hover:-translate-y-1 transition-all'>
                Start as Organizer
                <svg
                  className='w-5 h-5 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>

              <Link
                href='/register?type=member'
                className='btn border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 transition-all'>
                Join as Member
              </Link>
            </div>

            <div className='flex items-center justify-center space-x-8 mt-12 text-blue-200'>
              <div className='flex items-center space-x-2'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Free to use</span>
              </div>
              <div className='flex items-center space-x-2'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Start instantly</span>
              </div>
              <div className='flex items-center space-x-2'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Multi-language</span>
              </div>
            </div>

            {/* Platform Notice */}
            <div className='mt-8 p-4 bg-blue-800/30 rounded-lg'>
              <p className='text-sm text-blue-100'>
                <strong>Platform Notice:</strong> WALLET7 is a community
                management platform. All financial transactions occur directly
                between trusted group members.
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div className='absolute top-0 right-0 transform translate-x-16 -translate-y-8 opacity-10'>
            <div className='w-96 h-96 bg-white rounded-full'></div>
          </div>
          <div className='absolute bottom-0 left-0 transform -translate-x-16 translate-y-8 opacity-10'>
            <div className='w-64 h-64 bg-white rounded-full'></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-16'>
      <div className='container-responsive'>
        <div className='grid md:grid-cols-4 gap-8 mb-12'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center'>
                <Image
                  src='/icons/app-icons/apple-icon-180x180.png'
                  alt='Logo'
                  width={32}
                  height={32}
                  priority
                  className='object-cover w-8 h-8'
                />
              </div>
              <span className='text-xl font-bold'>WALLET7</span>
            </div>
            <p className='text-gray-400'>
              Digital platform for organizing and managing Rotating Savings &
              Credit Associations. Built for Indian communities with
              multi-language support.
            </p>
          </div>

          <div>
            <h4 className='font-bold mb-4'>Platform</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <Link
                  href='/login'
                  className='hover:text-white transition-colors'>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='hover:text-white transition-colors'>
                  Sign Up
                </Link>
              </li>
              <li>
                <a
                  href='#features'
                  className='hover:text-white transition-colors'>
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#how-it-works'
                  className='hover:text-white transition-colors'>
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold mb-4'>For Organizers</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>Group Management</li>
              <li>Member Tracking</li>
              <li>Payment Records</li>
              <li>Reports & Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold mb-4'>For Members</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>Payment History</li>
              <li>Payout Timeline</li>
              <li>Group Communication</li>
              <li>Notifications</li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-gray-400 text-sm'>
              © 2025 WALLET7. All rights reserved.
            </p>
            <div className='flex items-center space-x-6 text-sm'>
              <span className='text-gray-400'>🇮🇳 Made for India</span>
              <span className='text-gray-400'>Community Focused</span>
              <span className='text-green-400'>Live Platform</span>
            </div>
          </div>

          {/* Platform Disclaimer */}
          <div className='mt-6 p-4 bg-gray-800 rounded-lg'>
            <p className='text-xs text-gray-400 text-center'>
              <strong>Platform Notice:</strong> WALLET7 is a digital management
              platform for community savings groups. We provide organizational
              tools while all financial transactions occur directly between
              trusted group members. This platform does not process, hold, or
              facilitate money transfers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
