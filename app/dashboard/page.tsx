'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Users, Briefcase, Settings, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    icon: FolderOpen,
    href: '/dashboard/projects',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Services Offered',
    value: '6',
    icon: Settings,
    href: '/dashboard/services', 
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Team Members',
    value: '8',
    icon: Users,
    href: '/dashboard/staff',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Active Vacancies',
    value: '3',
    icon: Briefcase,
    href: '/dashboard/vacancies',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

const quickActions = [
  {
    title: 'Add New Project',
    description: 'Create a new project entry',
    href: '/dashboard/projects/new',
    icon: FolderOpen,
  },
  {
    title: 'Add New Service',
    description: 'Add a service to your offerings',
    href: '/dashboard/services/new',
    icon: Settings,
  },
  {
    title: 'Add Team Member',
    description: 'Add a new staff member',
    href: '/dashboard/staff/new',
    icon: Users,
  },
  {
    title: 'Post New Vacancy',
    description: 'Create a job posting',
    href: '/dashboard/vacancies/new',
    icon: Briefcase,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.displayName || user?.email}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your content.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link key={stat.name} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <action.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Content Overview
              </CardTitle>
              <CardDescription>
                Summary of your content across all categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projects</span>
                  <span className="text-sm font-medium">12 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Services</span>
                  <span className="text-sm font-medium">6 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Staff Members</span>
                  <span className="text-sm font-medium">8 items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vacancies</span>
                  <span className="text-sm font-medium">3 active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                System Status
              </CardTitle>
              <CardDescription>
                Current system information and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Authentication</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">User Role</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user?.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm text-gray-600">
                    {user?.lastLogin?.toLocaleDateString() || 'Today'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}