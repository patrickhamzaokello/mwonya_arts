'use client'
import * as z from 'zod'
import { CardWrapper } from '@/components/auth/Card-Wrapper'
import { useForm } from 'react-hook-form'
import { CardFooter } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RegisterSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { register } from '@/actions/register'
import { socialBTN } from '@/actions/OAuth'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react'

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          form.reset({ email: '', password: '', name: '' })
        }
      })
    })
  }

  return (
    <CardWrapper
      headerTitle="Register"
      showSocial
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tyler Durden"
                      {...field}
                      disabled={isPending}
                      type="name"
                      className="bg-base100 border-baseContent/20 text-baseContent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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
              Register
            </div>
          </Button>
        </form>
      </Form>
      <CardFooter className="mt-6 p-0 flex items-center justify-center">
        <div className="flex gap-2">
          <Button
            size="lg"
            className="bg-base100 rounded-[5px] border-baseContent border-2 text-md text-baseContent"
            variant="outline"
            onClick={() => socialBTN('google')}
          >
            <IconBrandGoogle className="mr-2" /> Googles
          </Button>

          <Button
            size="lg"
            className="bg-base100 rounded-[5px] border-baseContent border-2 text-md text-baseContent"
            variant="outline"
            onClick={() => socialBTN('github')}
          >
            <IconBrandGithub className="mr-2" /> <span>Github</span>
          </Button>
        </div>
      </CardFooter>
    </CardWrapper>
  )
}
