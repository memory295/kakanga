'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const now = new Date();
  const currentYear = now.getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200">
      <div className="w-full max-w-lg px-4">
        <Card className="shadow-xl border bg-white/90 backdrop-blur">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <Link href="/" className="inline-flex items-center" aria-label="Kakanga Constructions home">
                <Image
                  src="/images/kakangalogo.png"
                  alt="Kakanga Constructions"
                  width={120}
                  height={60}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Sign in to manage your content securely
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kakangaconstructions.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                ← Back to Website
              </Link>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              © {currentYear} Kakanga Constructions. All rights reserved.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}