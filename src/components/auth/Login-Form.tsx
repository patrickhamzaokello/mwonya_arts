'use client'

import * as z from 'zod'
import { CardWrapper } from '@/components/auth/Card-Wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/actions/login'
import { useEffect, useRef, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import { SocialProviders } from './SocialProviders'


export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [isPending, startTransition] = useTransition()
  const hasDisplayedError = useRef(false)
  useEffect(() => {
    if (urlError && !hasDisplayedError.current) {
      toast.error(urlError)
      hasDisplayedError.current = true
    }
  }, [urlError])

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          form.reset({ email: '', password: '' })
          window.location.href = '/'
        }
      })
    })
  }

  return (
    <CardWrapper
      headerTitle="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="tylerdurden@gmail.com"
                      disabled={isPending}
                      type="email"
                      className="bg-base100 border-baseContent/20 text-baseContent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      {...field}
                      disabled={isPending}
                      type="password"
                      className="bg-base100 border-baseContent/20 text-baseContent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <Button
                    size="sm"
                    variant="link"
                    className="px-0 "
                    type="button"
                  >
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="p-[3px] bg-transparent relative font-semibold w-full"
          >

            <div className="px-8 py-2  w-full rounded-[5px] relative group transition duration-200 text-base100 bg-primary text-lg">
              Login
            </div>
          </Button>
        </form>
      </Form>

      <SocialProviders />

    </CardWrapper>
  )
}
